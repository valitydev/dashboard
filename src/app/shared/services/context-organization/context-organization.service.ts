import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member, Organization } from '@vality/swag-organizations';
import isNil from 'lodash-es/isNil';
import { Observable, ReplaySubject, combineLatest, concat, defer, of } from 'rxjs';
import {
    catchError,
    distinctUntilChanged,
    filter,
    map,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs/operators';

import { MembersService, OrgsService } from '@dsh/app/api/organizations';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services/keycloak-token-info';

import { ErrorService } from '../error';

@Injectable({
    providedIn: 'root',
})
export class ContextOrganizationService {
    organization$: Observable<Organization | null> = concat(
        this.organizationsService.getContext().pipe(
            map(({ organizationId }) => organizationId),
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 404) {
                    return this.switchToFirstOrganization();
                }
                console.error(err);
                return of(null);
            }),
        ),
        defer(() => this.switchOrganization$).pipe(
            switchMap((organizationId) =>
                this.organizationsService
                    .switchContext({ organizationSwitchRequest: { organizationId } })
                    .pipe(map(() => organizationId)),
            ),
        ),
    ).pipe(
        distinctUntilChanged(),
        switchMap((orgId) =>
            orgId
                ? this.organizationsService.getOrg({ orgId }).pipe(
                      catchError((err) => {
                          if (err.status === 403) {
                              return this.switchToFirstOrganization().pipe(map(() => null));
                          }
                          console.error(err);
                          return of(null);
                      }),
                  )
                : of(null),
        ),
        shareReplay(1),
    );
    member$ = combineLatest([this.organization$, this.keycloakTokenInfoService.userID$]).pipe(
        filter(([org, userId]) => !isNil(org) && !isNil(userId)),
        switchMap(([{ id: orgId }, userId]) =>
            this.membersService.getOrgMember({ orgId, userId }).pipe(
                catchError((error) => {
                    if (error instanceof HttpErrorResponse && error.status === 404) {
                        return of<Member>({
                            id: userId,
                            userEmail: '',
                            roles: [{ id: null, roleId: RoleId.Administrator }],
                        });
                    }
                    this.errorService.error(error);
                    throw error;
                }),
            ),
        ),
        shareReplay(1),
    );

    private switchOrganization$ = new ReplaySubject<string>(1);

    constructor(
        private organizationsService: OrgsService,
        private membersService: MembersService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private errorService: ErrorService,
    ) {}

    switchOrganization(organizationId: string): void {
        if (organizationId) this.switchOrganization$.next(organizationId);
    }

    private switchToFirstOrganization() {
        return this.organizationsService.listOrgMembership({ limit: 1 }).pipe(
            map(({ result }) => result[0]?.id),
            tap((id) => this.switchOrganization(id)),
        );
    }
}

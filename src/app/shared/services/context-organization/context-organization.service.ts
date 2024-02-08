import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Organization, Member } from '@vality/swag-organizations';
import isNil from 'lodash-es/isNil';
import {
    Observable,
    ReplaySubject,
    EMPTY,
    concat,
    defer,
    combineLatest,
    of,
    throwError,
} from 'rxjs';
import { switchMap, shareReplay, catchError, map, tap, filter } from 'rxjs/operators';

import { OrgsService, MembersService, DEFAULT_ORGANIZATION_NAME } from '@dsh/app/api/organizations';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services/keycloak-token-info';

import { ErrorService } from '../error';

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class ContextOrganizationService {
    organization$: Observable<Organization> = concat(
        this.organizationsService.getContext().pipe(
            map(({ organizationId }) => organizationId),
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 404) {
                    return this.organizationsService.listOrgMembership({ limit: 1 }).pipe(
                        switchMap(({ result }) =>
                            result[0] ? of(result[0]) : this.createOrganization(),
                        ),
                        tap(({ id }) => this.switchOrganization(id)),
                        switchMap(() => EMPTY),
                    );
                }
                console.error(err);
                return EMPTY;
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
        switchMap((orgId) => this.organizationsService.getOrg({ orgId })),
        untilDestroyed(this),
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
                    return throwError(error);
                }),
            ),
        ),
        untilDestroyed(this),
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
        this.switchOrganization$.next(organizationId);
    }

    private createOrganization(): Observable<Organization> {
        return this.organizationsService.createOrg({
            organization: { name: DEFAULT_ORGANIZATION_NAME } as Organization,
        });
    }
}

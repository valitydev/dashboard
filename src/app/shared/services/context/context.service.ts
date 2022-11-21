import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization, Member } from '@vality/swag-organizations';
import { Observable, ReplaySubject, EMPTY, concat, defer, combineLatest, of, throwError } from 'rxjs';
import { distinctUntilChanged, switchMap, shareReplay, catchError, map } from 'rxjs/operators';

import { OrgsService, MembersService } from '@dsh/api/organizations';

import { ErrorService } from '../error';
import { KeycloakTokenInfoService } from '../keycloak-token-info';

@Injectable({
    providedIn: 'root',
})
export class ContextService {
    organization$: Observable<Organization> = concat(
        this.organizationsService.getContext().pipe(
            map(({ organizationId }) => organizationId),
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 404)
                    return this.organizationsService
                        .listOrgMembership({ limit: 1 })
                        .pipe(map(({ result }) => result[0].id));
                console.error(err);
                return EMPTY;
            })
        ),
        defer(() => this.switchOrganization$)
    ).pipe(
        distinctUntilChanged(),
        switchMap((organizationId) =>
            this.organizationsService
                .switchContext({ organizationSwitchRequest: { organizationId } })
                .pipe(map(() => organizationId))
        ),
        switchMap((orgId) => this.organizationsService.getOrg({ orgId })),
        shareReplay({ refCount: true, bufferSize: 1 })
    );
    member$ = combineLatest([this.organization$, this.keycloakTokenInfoService.userID$]).pipe(
        switchMap(([{ id: orgId }, userId]) =>
            this.membersService.getOrgMember({ orgId, userId }).pipe(
                catchError((error) => {
                    if (error instanceof HttpErrorResponse && error.status === 404) {
                        return of<Member>({
                            id: userId,
                            userEmail: '',
                            roles: [],
                        });
                    }
                    this.errorService.error(error);
                    return throwError(error);
                })
            )
        ),
        shareReplay({ refCount: true, bufferSize: 1 })
    );

    private switchOrganization$ = new ReplaySubject<string>(1);

    constructor(
        private organizationsService: OrgsService,
        private membersService: MembersService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private errorService: ErrorService
    ) {}

    switchOrganization(organizationId: string): void {
        this.switchOrganization$.next(organizationId);
    }
}

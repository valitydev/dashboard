import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Organization, Member, RoleId } from '@vality/swag-organizations';
import { Observable, ReplaySubject, EMPTY, concat, defer, combineLatest, of, throwError } from 'rxjs';
import { switchMap, shareReplay, catchError, map, tap, withLatestFrom } from 'rxjs/operators';

import { OrgsService, MembersService } from '@dsh/api/organizations';

import { ErrorService } from '../error';
import { KeycloakTokenInfoService } from '../keycloak-token-info';

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class ContextService {
    organization$: Observable<Organization> = concat(
        this.organizationsService.getContext().pipe(
            map(({ organizationId }) => organizationId),
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 404)
                    return this.organizationsService.listOrgMembership({ limit: 1 }).pipe(
                        map(({ result }) => result[0].id),
                        tap((id) => this.switchOrganization(id)),
                        switchMap(() => EMPTY)
                    );
                console.error(err);
                return EMPTY;
            })
        ),
        defer(() => this.switchOrganization$).pipe(
            switchMap((organizationId) =>
                this.organizationsService
                    .switchContext({ organizationSwitchRequest: { organizationId } })
                    .pipe(map(() => organizationId))
            )
        )
    ).pipe(
        switchMap((orgId) => this.organizationsService.getOrg({ orgId })),
        withLatestFrom(this.keycloakTokenInfoService.userID$),
        // TODO: temporary replace party with user id
        map(([org, party]) => ({ ...org, party })),
        untilDestroyed(this),
        shareReplay(1)
    );
    member$ = combineLatest([this.organization$, this.keycloakTokenInfoService.userID$]).pipe(
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
                })
            )
        ),
        untilDestroyed(this),
        shareReplay(1)
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

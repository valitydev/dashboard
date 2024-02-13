import { Injectable } from '@angular/core';
import { Member, Organization } from '@vality/swag-organizations';
import { combineLatest, defer, Observable, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { MembersService } from '@dsh/app/api/organizations';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { SHARE_REPLAY_CONF } from '@dsh/app/custom-operators';
import { KeycloakTokenInfoService } from '@dsh/app/shared';

@Injectable()
export class OrganizationManagementService {
    members$: Observable<Member[]> = defer(() => this.organization$).pipe(
        switchMap(({ id }) => this.membersService.listOrgMembers({ orgId: id })),
        pluck('result'),
        shareReplay(SHARE_REPLAY_CONF),
    );
    isOrganizationOwner$: Observable<boolean> = defer(() =>
        combineLatest([this.organization$, this.keycloakTokenInfoService.userID$]),
    ).pipe(
        map(([{ owner }, id]) => owner === id),
        shareReplay(SHARE_REPLAY_CONF),
    );
    isOrganizationAdmin$: Observable<boolean> = combineLatest([
        this.members$,
        this.keycloakTokenInfoService.userID$,
    ]).pipe(
        map(([members, userId]) => members.find((m) => m.id === userId)),
        map(
            (member) => member?.roles?.findIndex?.((r) => r.roleId === RoleId.Administrator) !== -1,
        ),
        shareReplay(SHARE_REPLAY_CONF),
    );
    hasAdminAccess$: Observable<boolean> = defer(() =>
        combineLatest([this.isOrganizationAdmin$, this.isOrganizationOwner$]),
    ).pipe(
        map((hasAdminLikeRoles) => hasAdminLikeRoles.includes(true)),
        shareReplay(SHARE_REPLAY_CONF),
    );

    private organization$ = new ReplaySubject<Organization>();

    constructor(
        private membersService: MembersService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
    ) {}

    init(organization: Organization) {
        this.organization$.next(organization);
    }
}

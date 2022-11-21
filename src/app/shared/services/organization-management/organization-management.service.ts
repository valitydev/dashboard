import { Injectable } from '@angular/core';
import { Member, Organization, RoleId } from '@vality/swag-organizations';
import { combineLatest, defer, Observable, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { MembersService } from '@dsh/api/organizations';
import { ContextService } from '@dsh/app/shared';
import { Initializable } from '@dsh/app/shared/types';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

@Injectable()
export class OrganizationManagementService implements Initializable {
    members$: Observable<Member[]> = defer(() => this.organization$).pipe(
        switchMap(({ id }) => this.membersService.listOrgMembers({ orgId: id })),
        pluck('result'),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isOrganizationOwner$: Observable<boolean> = defer(() =>
        combineLatest([this.organization$, this.contextService.organization$.pipe(pluck('party'))])
    ).pipe(
        map(([{ owner }, id]) => owner === id),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isOrganizationAdmin$: Observable<boolean> = this.contextService.member$.pipe(
        map((member) => member.roles.findIndex((r) => r.roleId === RoleId.Administrator) !== -1),
        shareReplay(SHARE_REPLAY_CONF)
    );
    hasAdminAccess$: Observable<boolean> = defer(() =>
        combineLatest([this.isOrganizationAdmin$, this.isOrganizationOwner$])
    ).pipe(
        map((hasAdminLikeRoles) => hasAdminLikeRoles.includes(true)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private organization$ = new ReplaySubject<Organization>();

    constructor(private membersService: MembersService, private contextService: ContextService) {}

    init(organization: Organization) {
        this.organization$.next(organization);
    }
}

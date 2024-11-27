import { Injectable } from '@angular/core';
import { Member, Organization } from '@vality/swag-organizations';
import { combineLatest, defer, Observable, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { MembersService } from '@dsh/app/api/organizations';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { KeycloakTokenInfoService } from '@dsh/app/shared';

@Injectable()
export class OrganizationManagementService {
    members$: Observable<Member[]> = defer(() => this.organization$).pipe(
        switchMap(({ id }) => this.membersService.listOrgMembers({ orgId: id })),
        pluck('result'),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    isOrganizationOwner$: Observable<boolean> = defer(() =>
        combineLatest([this.organization$, this.keycloakTokenInfoService.userID$]),
    ).pipe(
        map(([{ owner }, id]) => owner === id),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    isOrganizationAdmin$: Observable<boolean> = combineLatest([
        this.members$,
        this.keycloakTokenInfoService.userID$,
    ]).pipe(
        map(([members, userId]) => members.find((m) => m.id === userId)),
        map(
            (member) => member?.roles?.findIndex?.((r) => r.roleId === RoleId.Administrator) !== -1,
        ),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    hasAdminAccess$: Observable<boolean> = defer(() =>
        combineLatest([this.isOrganizationAdmin$, this.isOrganizationOwner$]),
    ).pipe(
        map((hasAdminLikeRoles) => hasAdminLikeRoles.includes(true)),
        shareReplay({ refCount: true, bufferSize: 1 }),
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ContextService } from '@dsh/app/shared';

import { ROLE_ACCESS_GROUPS } from './role-access-groups';
import { RoleAccess } from './types/role-access';
import { RoleAccessName } from './types/role-access-name';

const ROLE_ACCESSES_OBJECT = Object.fromEntries(
    ROLE_ACCESS_GROUPS.flatMap((r) => [r, ...(r.children || [])] as RoleAccess[]).map((r) => [r.name, r.availableRoles])
);

@Injectable({
    providedIn: 'root',
})
export class RoleAccessService {
    constructor(private contextService: ContextService) {}

    isAccessAllowed(...roleAccessNames: RoleAccessName[]): Observable<boolean> {
        return this.contextService.member$.pipe(
            first(),
            map((member) => {
                const memberRoles = member.roles.map((r) => r.roleId);
                return roleAccessNames.every((access) =>
                    ROLE_ACCESSES_OBJECT[access]?.some((role) => memberRoles.includes(role))
                );
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContextOrganizationService } from '@dsh/app/shared';

import { ROLE_ACCESS_GROUPS } from './role-access-groups';
import { RoleAccess } from './types/role-access';
import { RoleAccessName } from './types/role-access-name';

const ROLE_ACCESSES_OBJECT = Object.fromEntries(
    ROLE_ACCESS_GROUPS.flatMap((r) => [r, ...(r.children || [])] as RoleAccess[]).map((r) => [
        r.name,
        r.availableRoles,
    ]),
);

@Injectable({
    providedIn: 'root',
})
export class RoleAccessService {
    constructor(private contextOrganizationService: ContextOrganizationService) {}

    isAccessAllowed(
        roleAccessNames: RoleAccessName[],
        type: 'every' | 'some' = 'every',
    ): Observable<boolean> {
        if (!roleAccessNames.length) {return of(true);}
        return this.contextOrganizationService.member$.pipe(
            map((member) => {
                const memberRoles = member.roles.map((r) => r.roleId);
                return roleAccessNames[type](
                    (access) =>
                        ROLE_ACCESSES_OBJECT[access]?.some((role) => memberRoles.includes(role)),
                );
            }),
        );
    }
}

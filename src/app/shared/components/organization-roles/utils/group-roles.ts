import { MemberRole } from '@vality/swag-organizations';

import { RoleId } from '@dsh/app/auth/types/role-id';

import { RoleGroup, RoleGroupScope } from '../types/role-group';

import { sortRoleIds } from './sort-role-ids';

export function groupRoles(roles: MemberRole[]): RoleGroup[] {
    return roles
        .reduce<RoleGroup[]>((groups, role) => {
            let group: RoleGroup = groups.find((g) => g.id === role.roleId);
            if (!group) {
                group = { id: role.roleId as RoleId, scopes: [] };
                groups.push(group);
            }
            let scope: RoleGroupScope = group.scopes.find((s) => s.id === role.scope.id);
            if (role.scope) {
                if (!scope) {
                    scope = {
                        id: role.scope.id,
                        resourcesIds: [],
                    };
                    group.scopes.push(scope);
                }
                scope.resourcesIds.push(role.scope.resourceId);
            }
            return groups;
        }, [])
        .sort((a, b) => sortRoleIds(a.id, b.id));
}

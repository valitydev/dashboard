import { RoleId } from '@vality/swag-organizations';

import { RoleGroup } from '../types/role-group';

export function getRolesByGroup(group: RoleGroup): MemberRoleNoId[] {
    if (group.id === RoleId.Administrator) {
        return [{ roleId: group.id }];
    }
    return group.scopes
        .map((scope) =>
            scope.resourcesIds.map((resourceId) => ({
                roleId: group.id,
                scope: { id: scope.id, resourceId },
            })),
        )
        .flat();
}

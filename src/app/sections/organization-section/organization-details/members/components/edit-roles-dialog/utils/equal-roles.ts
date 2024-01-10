import { MemberRoleOptionalId } from '@dsh/app/api/organizations';

export function equalRoles(a: MemberRoleOptionalId, b: MemberRoleOptionalId) {
    return (
        (a.id && b.id && a.id === b.id) ||
        (a.roleId === b.roleId &&
            ((!a.scope && !b.scope) ||
                (a.scope.id === b.scope.id && a.scope.resourceId === b.scope.resourceId)))
    );
}

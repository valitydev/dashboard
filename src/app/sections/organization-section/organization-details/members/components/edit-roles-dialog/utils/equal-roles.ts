import { MemberRoleOptionalId } from '@dsh/app/api/organizations';

export function equalRoles(a: MemberRoleOptionalId, b: MemberRoleOptionalId): boolean {
    if (typeof a !== 'object' || typeof b !== 'object') {
        return false;
    }
    if (a.id && b.id) {
        return a.id === b.id;
    }
    return (
        a.roleId === b.roleId &&
        a.scope?.id === b.scope?.id &&
        a.scope?.resourceId === b.scope?.resourceId
    );
}

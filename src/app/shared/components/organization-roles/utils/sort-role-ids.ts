import { RoleId } from '@dsh/app/auth/types/role-id';

export const ROLE_PRIORITY_DESC: Record<RoleId, number> = {
    [RoleId.Administrator]: 0,
    [RoleId.Manager]: 1,
    [RoleId.Accountant]: 2,
    [RoleId.Integrator]: 3,
    [RoleId.WalletManager]: 4,
};

export function sortRoleIds(a: RoleId, b: RoleId) {
    return ROLE_PRIORITY_DESC[a] - ROLE_PRIORITY_DESC[b];
}

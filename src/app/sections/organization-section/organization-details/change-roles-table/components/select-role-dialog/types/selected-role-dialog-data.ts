import { RoleId } from '@dsh/app/auth/types/role-id';

export interface SelectRoleDialogData {
    availableRoles: RoleId[];
    isShow?: boolean;
}

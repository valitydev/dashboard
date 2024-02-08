import { RoleId } from '@dsh/app/auth/types/role-id';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

export type SelectRoleDialogResult = BaseDialogResponseStatus | { selectedRoleId: RoleId };

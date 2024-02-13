import { RoleId } from '@dsh/app/auth/types/role-id';

export interface ShopsRole {
    id: RoleId;
    shopIds: string[];
}

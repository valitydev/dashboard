import { RoleId } from '@vality/swag-organizations';

export interface RoleAccess {
    name: string;
    isHeader?: boolean;
    availableRoles?: RoleId[];
}

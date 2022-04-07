import { RoleId } from '@vality/swag-organizations';

export interface RoleAccessItem {
    name: string;
    isHeader?: boolean;
    availableRoles?: RoleId[];
}

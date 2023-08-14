import { RoleId } from '@vality/swag-organizations';
import { Overwrite } from 'utility-types';

import { RoleAccessName } from './role-access-name';

export interface RoleAccess {
    name: RoleAccessName;
    availableRoles: RoleId[];
}

export interface RoleAccessGroup
    extends Overwrite<RoleAccess, Partial<Pick<RoleAccess, 'availableRoles'>>> {
    children?: RoleAccess[];
}

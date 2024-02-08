import { Overwrite } from 'utility-types';

import { RoleAccessName } from './role-access-name';
import { RoleId } from './role-id';

export interface RoleAccess {
    name: RoleAccessName;
    availableRoles: RoleId[];
}

export interface RoleAccessGroup
    extends Overwrite<RoleAccess, Partial<Pick<RoleAccess, 'availableRoles'>>> {
    children?: RoleAccess[];
}

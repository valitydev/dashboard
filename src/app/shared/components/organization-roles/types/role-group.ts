import { RoleId } from '@dsh/app/auth/types/role-id';

import { ResourceScopeId } from '@vality/swag-organizations';


export type ResourceId = string;

export interface RoleGroupScope {
    id: ResourceScopeId;
    resourcesIds: ResourceId[];
}

export interface RoleGroup {
    id: RoleId;
    scopes: RoleGroupScope[];
}

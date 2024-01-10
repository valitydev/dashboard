import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { MemberRole } from '@vality/swag-organizations';

import { OrganizationsDictionaryService } from '@dsh/app/api/organizations';

import { RoleGroup } from './types/role-group';
import { groupRoles } from './utils/group-roles';

@Component({
    selector: 'dsh-organization-roles',
    templateUrl: 'organization-roles.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationRolesComponent {
    @Input({ transform: booleanAttribute }) isOwner: boolean;

    @Input() set roles(roles: MemberRole[]) {
        this.rolesByGroup = groupRoles(roles);
    }

    rolesByGroup: RoleGroup[] = [];
    roleIdDict$ = this.organizationsDictionaryService.roleId$;
    resourceScopeIdDict$ = this.organizationsDictionaryService.resourceScopeId$;

    constructor(private organizationsDictionaryService: OrganizationsDictionaryService) {}
}

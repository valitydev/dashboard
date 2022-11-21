import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { ContextService, ErrorService } from '@dsh/app/shared';

import { KeycloakAuthGuard, KeycloakService } from './keycloak';
import { ROLE_ACCESS_GROUPS } from './role-access-groups';
import { RoleAccess } from './types/role-access';
import { RoleAccessName } from './types/role-access-name';

const ROLE_ACCESSES_OBJECT = Object.fromEntries(
    ROLE_ACCESS_GROUPS.flatMap((r) => [r, ...(r.children || [])] as RoleAccess[]).map((r) => [r.name, r.availableRoles])
);

@Injectable()
export class AppAuthGuardService extends KeycloakAuthGuard {
    constructor(
        protected router: Router,
        protected keycloakAngular: KeycloakService,
        private contextService: ContextService,
        private errorService: ErrorService
    ) {
        super(router, keycloakAngular);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean> {
        const routeAccesses = (route.data.roles as RoleAccessName[]) || [];
        const memberRoles = (await firstValueFrom(this.contextService.member$)).roles.map((r) => r.roleId);
        const isAccessAllowed = routeAccesses.every((access) =>
            ROLE_ACCESSES_OBJECT[access].some((role) => memberRoles.includes(role))
        );
        if (!isAccessAllowed) this.errorService.error('Access is denied');
        return isAccessAllowed;
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { KeycloakAuthGuard, KeycloakService } from './keycloak';
import { RoleAccessService } from './role-access.service';
import { RoleAccessName } from './types/role-access-name';

@Injectable()
export class AppAuthGuardService extends KeycloakAuthGuard {
    constructor(
        protected router: Router,
        protected keycloakAngular: KeycloakService,
        private roleAccessService: RoleAccessService,
    ) {
        super(router, keycloakAngular);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
        const isAccessAllowed = await firstValueFrom(
            this.roleAccessService.isAccessAllowed(route.data.roles as RoleAccessName[]),
        );
        if (!isAccessAllowed) {
            console.error('Access is denied');
            return this.router.createUrlTree(['404']);
        }
        return isAccessAllowed;
    }
}

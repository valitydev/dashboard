import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { KeycloakAuthGuard, KeycloakService } from './keycloak';

@Injectable()
export class AppAuthGuardService extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean> {
        const isAccessAllowed = Array.isArray(this.roles) && route.data.roles.every((v) => this.roles.includes(v));
        if (!isAccessAllowed) {
            console.error('Access is denied');
        }
        return isAccessAllowed;
    }
}

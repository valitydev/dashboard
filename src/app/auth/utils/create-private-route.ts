import { Route } from '@angular/router';

import { AppAuthGuardService, RoleAccessName } from '@dsh/app/auth';

export function createPrivateRoute(route: Route, roles: RoleAccessName[]) {
    return {
        ...route,
        canActivate: [...(route?.canActivate ?? []), AppAuthGuardService],
        data: {
            ...(route?.data ?? {}),
            roles,
        },
    };
}

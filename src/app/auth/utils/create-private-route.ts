import { Route } from '@angular/router';

import { RoleAccessName, AppAuthGuardService } from '@dsh/app/auth';

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

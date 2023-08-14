import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleAccessName, createPrivateRoute } from '@dsh/app/auth';

import { AnalyticsComponent } from './analytics.component';

const OPERATIONS_ROUTES: Routes = [
    createPrivateRoute(
        {
            path: '',
            component: AnalyticsComponent,
        },
        [RoleAccessName.ViewAnalytics],
    ),
];

@NgModule({
    imports: [RouterModule.forChild(OPERATIONS_ROUTES)],
    exports: [RouterModule],
})
export class AnalyticsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleAccessName, createPrivateRoute } from '@dsh/app/auth';

import { IntegrationsComponent } from './integrations.component';

const ROUTES: Routes = [
    {
        path: '',
        component: IntegrationsComponent,
        children: [
            createPrivateRoute(
                {
                    path: 'webhooks',
                    loadChildren: () => import('./webhooks').then((m) => m.WebhooksModule),
                },
                [RoleAccessName.Webhooks],
            ),
            createPrivateRoute(
                {
                    path: 'payment-link',
                    loadChildren: () => import('./payment-link').then((m) => m.PaymentLinkModule),
                },
                [RoleAccessName.PaymentLinks],
            ),
            createPrivateRoute(
                {
                    path: 'api-keys',
                    loadChildren: () => import('./api-keys').then((m) => m.ApiKeysModule),
                },
                [RoleAccessName.ApiKeys],
            ),
            {
                path: '',
                redirectTo: 'payment-link',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class IntegrationsRoutingModule {}

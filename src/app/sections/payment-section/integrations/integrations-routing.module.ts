import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { createPrivateRoute, RoleAccessName } from '@dsh/app/auth';

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
                [RoleAccessName.ManageWebhooks]
            ),
            createPrivateRoute(
                {
                    path: 'payment-link',
                    loadChildren: () => import('./payment-link').then((m) => m.PaymentLinkModule),
                },
                [RoleAccessName.CreatePaymentLink]
            ),
            createPrivateRoute(
                {
                    path: 'api-key',
                    loadChildren: () => import('./api-key').then((m) => m.ApiKeyModule),
                },
                [RoleAccessName.ViewApiKey]
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

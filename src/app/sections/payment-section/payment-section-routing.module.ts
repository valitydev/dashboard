import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { createPrivateRoute, RoleAccessName } from '@dsh/app/auth';

import { PaymentSectionComponent } from './payment-section.component';

const PAYMENT_SECTION_ROUTES: Routes = [
    {
        path: '',
        component: PaymentSectionComponent,
    },
    {
        path: 'realm/:realm',
        component: PaymentSectionComponent,
        children: [
            {
                path: '',
                redirectTo: 'shops',
                pathMatch: 'full',
            },
            {
                path: 'shops',
                loadChildren: () => import('./shops/shops.module').then((m) => m.ShopsModule),
            },
            createPrivateRoute(
                {
                    path: 'analytics',
                    loadChildren: () =>
                        import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
                },
                [RoleAccessName.ViewAnalytics],
            ),
            {
                path: 'operations',
                loadChildren: () =>
                    import('./operations/operations.module').then((m) => m.OperationsModule),
            },
            createPrivateRoute(
                {
                    path: 'reports',
                    loadChildren: () =>
                        import('./reports/reports.module').then((m) => m.ReportsModule),
                },
                [RoleAccessName.Reports],
            ),
            // createPrivateRoute(
            //     {
            //         path: 'payouts',
            //         loadChildren: () => import('./payouts/payouts.module').then((m) => m.PayoutsModule),
            //     },
            //     [RoleAccessName.ViewPayouts]
            // ),
            {
                path: 'integrations',
                loadChildren: () =>
                    import('./integrations/integrations.module').then((m) => m.IntegrationsModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(PAYMENT_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class PaymentSectionRoutingModule {}

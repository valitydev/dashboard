import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleAccessName, createPrivateRoute } from '@dsh/app/auth';

import { OperationsComponent } from './operations.component';

const OPERATIONS_ROUTES: Routes = [
    {
        path: '',
        component: OperationsComponent,
        children: [
            createPrivateRoute(
                {
                    path: 'payments',
                    loadChildren: () =>
                        import('./payments/payments.module').then((mod) => mod.PaymentsModule),
                },
                [RoleAccessName.ViewPayments],
            ),
            createPrivateRoute(
                {
                    path: 'refunds',
                    loadChildren: () =>
                        import('./refunds/refunds.module').then((mod) => mod.RefundsModule),
                },
                [RoleAccessName.ViewRefunds],
            ),
            createPrivateRoute(
                {
                    path: 'invoices',
                    loadChildren: () =>
                        import('./invoices/invoices.module').then((mod) => mod.InvoicesModule),
                },
                [RoleAccessName.ViewInvoices],
            ),
            {
                path: '',
                redirectTo: 'payments',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(OPERATIONS_ROUTES)],
    exports: [RouterModule],
})
export class OperationsRoutingModule {}

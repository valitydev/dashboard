import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '@dsh/environments';

import { WalletSectionComponent } from './wallet-section.component';

const WALLET_SECTION_ROUTES: Routes = [
    {
        path: '',
        component: WalletSectionComponent,
        children: [
            {
                path: 'wallets',
                loadChildren: () => import('./wallets').then((m) => m.WalletsModule),
            },
            {
                path: 'deposits',
                loadChildren: () => import('./deposits').then((m) => m.DepositsModule),
            },
            {
                path: 'withdrawals',
                loadChildren: () => import('./withdrawals').then((m) => m.WithdrawalsModule),
            },
            {
                path: 'integrations',
                loadChildren: () => import('./integrations').then((m) => m.IntegrationsModule),
            },
            ...(environment.production
                ? []
                : [
                      {
                          path: 'reports',
                          loadChildren: () => import('./reports').then((m) => m.ReportsModule),
                      },
                  ]),
            {
                path: '',
                redirectTo: 'wallets',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(WALLET_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class WalletSectionRoutingModule {}

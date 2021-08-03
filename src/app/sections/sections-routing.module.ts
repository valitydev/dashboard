import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./landing').then((m) => m.LandingModule),
    },
    {
        path: 'claim-section',
        loadChildren: () => import('./claim-section').then((m) => m.ClaimSectionModule),
    },
    {
        path: 'payment-section',
        loadChildren: () => import('./payment-section').then((m) => m.PaymentSectionModule),
    },
    {
        path: 'wallet-section',
        loadChildren: () => import('./wallet-section').then((m) => m.WalletSectionModule),
    },
    {
        path: 'wallet',
        loadChildren: () => import('./wallet-details').then((m) => m.WalletDetailsModule),
    },
    {
        path: 'organizations',
        loadChildren: () => import('./organizations').then((m) => m.OrganizationsModule),
    },
    {
        path: 'organization/:orgId',
        loadChildren: () => import('./organization-details').then((m) => m.OrganizationDetailsModule),
    },
    {
        path: '**',
        loadChildren: () => import('./page-not-found').then((m) => m.PageNotFoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { paramsInheritanceStrategy: 'always', relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class SectionsRoutingModule {}

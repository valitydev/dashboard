import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAuthGuardService, RoleAccessName } from '@dsh/app/auth';

import { ClaimSectionComponent } from './claim-section.component';

const CLAIM_SECTION_ROUTES: Routes = [
    {
        path: '',
        component: ClaimSectionComponent,
        canActivate: [AppAuthGuardService],
        data: { roles: [RoleAccessName.Claims] },
        children: [
            {
                path: 'claims',
                loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule),
            },
            {
                path: 'claims/:claimId',
                loadChildren: () => import('./claim/claim.module').then((m) => m.ClaimModule),
            },
            { path: '', redirectTo: 'claims', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(CLAIM_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class ClaimSectionRoutingModule {}

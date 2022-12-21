import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleAccessName, createPrivateRoute } from '@dsh/app/auth';

import { ClaimSectionComponent } from './claim-section.component';

const CLAIM_SECTION_ROUTES: Routes = [
    createPrivateRoute(
        {
            path: '',
            component: ClaimSectionComponent,
            children: [
                {
                    path: 'claims',
                    loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule),
                },
                { path: '', redirectTo: 'claims', pathMatch: 'full' },
            ],
        },
        [RoleAccessName.Claims]
    ),
];

@NgModule({
    imports: [RouterModule.forChild(CLAIM_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class ClaimSectionRoutingModule {}

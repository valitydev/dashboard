import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiKeysComponent } from './api-keys.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ApiKeysComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
})
export class ApiKeysRoutingModule {}

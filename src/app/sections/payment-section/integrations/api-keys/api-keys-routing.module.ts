import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiKeysComponent } from './api-keys.component';
import { ApiKeyRevokeComponent } from './components/api-key-revoke/api-key-revoke.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ApiKeysComponent,
    },
    {
        path: ':apiKeyId/revoke/:apiKeyRevokeToken',
        component: ApiKeyRevokeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
})
export class ApiKeysRoutingModule {}

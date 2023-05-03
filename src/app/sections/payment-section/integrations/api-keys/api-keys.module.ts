import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { ApiKeysListModule } from './api-keys-list/api-keys-list.module';
import { ApiKeysRoutingModule } from './api-keys-routing.module';
import { ApiKeysComponent } from './api-keys.component';
import { ApiKeyCreateDialogComponent } from './components/api-key-create-dialog/api-key-create-dialog.component';
import { ApiKeyRevokeComponent } from './components/api-key-revoke/api-key-revoke.component';

@NgModule({
    declarations: [ApiKeysComponent, ApiKeyRevokeComponent],
    imports: [
        ApiKeysRoutingModule,
        FlexModule,
        TranslocoModule,
        CardModule,
        MatInputModule,
        CommonModule,
        ButtonModule,
        ClipboardModule,
        EmptySearchResultModule,
        SpinnerModule,
        MatSlideToggleModule,
        ApiKeysListModule,
        ApiKeyCreateDialogComponent,
    ],
})
export class ApiKeysModule {}

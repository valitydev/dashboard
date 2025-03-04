import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { AccordionTableModule } from '@dsh/app/shared/components/accordion-table';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ApiKeyDetailsModule } from './api-key-details';
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
        MatButtonModule,
        ClipboardModule,
        EmptySearchResultModule,
        SpinnerModule,
        MatSlideToggleModule,
        ApiKeyDetailsModule,
        ApiKeyCreateDialogComponent,
        ShowMorePanelModule,
        AccordionTableModule,
    ],
})
export class ApiKeysModule {}

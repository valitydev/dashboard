import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { WebhookListComponent } from './webhook-list.component';
import { WebhookRowComponent } from './webhook-row';
import { WebhookRowHeaderComponent } from './webhook-row-header';
import { DeleteWebhookModule } from '../delete-webhook';
import { WebhookDetailsModule } from '../webhook-details';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        WebhookDetailsModule,
        DeleteWebhookModule,
    ],
    declarations: [WebhookListComponent, WebhookRowHeaderComponent, WebhookRowComponent],
    exports: [WebhookListComponent],
})
export class WebhookListModule {}

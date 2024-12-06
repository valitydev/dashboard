import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';

import { CreateWebhookModule } from './create-webhook';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { WebhookListModule } from './webhook-list';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [
        WebhooksRoutingModule,
        MatButtonModule,
        CommonModule,
        FlexModule,
        TranslocoModule,
        SpinnerModule,
        WebhookListModule,
        EmptySearchResultModule,
        CreateWebhookModule,
    ],
    declarations: [WebhooksComponent],
    providers: [ReceiveWebhooksService],
})
export class WebhooksModule {}

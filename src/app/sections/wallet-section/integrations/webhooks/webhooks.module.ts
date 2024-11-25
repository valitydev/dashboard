import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ButtonModule } from '@dsh/components/buttons';
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
        ButtonModule,
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';

import { CreateWebhookService } from './create-webhook';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { WebhooksExpandedIdManager } from './webhooks-expanded-id-manager.service';

@Component({
    templateUrl: 'webhooks.component.html',
    providers: [ReceiveWebhooksService, WebhooksExpandedIdManager],
})
export class WebhooksComponent implements OnInit, OnDestroy {
    webhooks$ = this.receiveWebhooksService.webhooks$;
    isLoading$ = this.receiveWebhooksService.isLoading$;
    lastUpdated$ = this.receiveWebhooksService.lastUpdated$;
    expandedId$ = this.webhooksExpandedIdManager.expandedId$;

    constructor(
        private receiveWebhooksService: ReceiveWebhooksService,
        private createWebhookService: CreateWebhookService,
        private webhooksExpandedIdManager: WebhooksExpandedIdManager,
        private transloco: TranslocoService,
        private log: NotifyLogService,
    ) {}

    ngOnInit() {
        this.createWebhookService.init();
        this.receiveWebhooksService.receiveWebhooks();
        this.createWebhookService.webhookCreated$.subscribe(() => {
            this.log.success(
                this.transloco.selectTranslate(
                    'webhook.createWebhook.successfullyCreated',
                    null,
                    'payment-section',
                ),
            );
            this.receiveWebhooks();
        });
    }

    ngOnDestroy() {
        this.createWebhookService.destroy();
    }

    createWebhook() {
        this.createWebhookService.createWebhook();
    }

    receiveWebhooks() {
        this.receiveWebhooksService.receiveWebhooks();
    }

    expandedIdChange(id: number) {
        this.webhooksExpandedIdManager.expandedIdChange(id);
    }
}

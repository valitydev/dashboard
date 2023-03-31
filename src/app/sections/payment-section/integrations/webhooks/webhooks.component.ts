import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';

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
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.createWebhookService.init();
        this.receiveWebhooksService.receiveWebhooks();
        this.createWebhookService.webhookCreated$.subscribe(() => {
            this.snackBar.open(
                this.transloco.translate('webhook.createWebhook.successfullyCreated', null, 'payment-section'),
                'OK',
                {
                    duration: 2000,
                }
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

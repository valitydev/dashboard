import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';
import { Webhook } from '@vality/swag-wallet';

import { DeleteWebhookService } from '../delete-webhook';
import { DeleteWebhookParams } from '../webhook-details/webhook-actions';

@Component({
    selector: 'dsh-webhooks-list',
    templateUrl: 'webhook-list.component.html',
    standalone: false,
})
export class WebhookListComponent implements OnInit, OnDestroy {
    @Input() webhooks: Webhook[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();
    @Output() refreshData: EventEmitter<void> = new EventEmitter();

    constructor(
        private deleteWebhookService: DeleteWebhookService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {}

    ngOnInit() {
        this.deleteWebhookService.init();
        this.deleteWebhookService.webhookDeleted$.subscribe(() => {
            this.log.success(
                this.transloco.selectTranslate(
                    'webhooks.actions.webhookDeleted',
                    null,
                    'wallet-section',
                ),
            );
            this.refreshData.emit();
        });
    }

    ngOnDestroy(): void {
        this.deleteWebhookService.destroy();
    }

    deleteWebhook(params: DeleteWebhookParams) {
        this.deleteWebhookService.deleteWebhook(params);
    }
}

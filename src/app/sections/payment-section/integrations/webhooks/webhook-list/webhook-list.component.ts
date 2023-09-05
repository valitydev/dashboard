import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { Webhook, WebhookScope } from '@vality/swag-payments';

import { DeleteWebhookService } from '../delete-webhook';
import { getShopIdFromScope } from '../get-shop-id-from-scope';

@Component({
    selector: 'dsh-webhooks-list',
    templateUrl: 'webhook-list.component.html',
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
                    'webhook.actions.delete.success',
                    null,
                    'payment-section',
                ),
            );
            this.refreshData.emit();
        });
    }

    ngOnDestroy(): void {
        this.deleteWebhookService.destroy();
    }

    deleteWebhook(id: string) {
        this.deleteWebhookService.deleteWebhook(id);
    }

    getShopID(scope: WebhookScope): string {
        return getShopIdFromScope(scope);
    }
}

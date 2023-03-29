import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Webhook } from '@vality/swag-wallet';

import { DeleteWebhookService } from '../delete-webhook';
import { DeleteWebhookParams } from '../webhook-details/webhook-actions';

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
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.deleteWebhookService.init();
        this.deleteWebhookService.webhookDeleted$.subscribe(() => {
            this.snackBar.open(
                this.transloco.translate('webhooks.actions.webhookDeleted', null, 'wallet-section'),
                'OK',
                {
                    duration: 2000,
                }
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

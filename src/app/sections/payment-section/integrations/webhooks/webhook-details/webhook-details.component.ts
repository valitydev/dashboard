import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Webhook, WebhookScope } from '@vality/swag-payments';

import { getShopIdFromScope } from '../get-shop-id-from-scope';

@Component({
    selector: 'dsh-webhook-details',
    templateUrl: 'webhook-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WebhookDetailsComponent {
    @Input() webhook: Webhook;
    @Output() deleteWebhook = new EventEmitter<string>();

    getShopID(scope: WebhookScope): string {
        return getShopIdFromScope(scope);
    }
}

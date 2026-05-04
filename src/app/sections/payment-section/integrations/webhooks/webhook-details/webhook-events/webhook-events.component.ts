import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoicesTopic, WebhookScope } from '@vality/swag-payments';
import { combineLatest } from 'rxjs';

import { PaymentsDictionaryService } from '@dsh/app/api/payments';

@Component({
    selector: 'dsh-webhook-events',
    templateUrl: 'webhook-events.component.html',
    styleUrls: ['webhook-events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WebhookEventsComponent {
    @Input()
    scope: WebhookScope;

    eventType$ = combineLatest([this.paymentsDictionaryService.invoicesTopicEventType$]);

    get events(): InvoicesTopic.EventTypesEnum[] {
        switch (this.scope.topic) {
            case 'InvoicesTopic':
                return (this.scope as unknown as InvoicesTopic).eventTypes;
        }
    }

    constructor(private paymentsDictionaryService: PaymentsDictionaryService) {}
}

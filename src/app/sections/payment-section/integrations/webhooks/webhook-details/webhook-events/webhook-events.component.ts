import { combineLatest } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentsDictionaryService } from '@dsh/app/api/payments';

import { InvoicesTopic, WebhookScope } from '@vality/swag-payments';


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

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomersTopic, InvoicesTopic, WebhookScope } from '@vality/swag-payments';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentsDictionaryService } from '@dsh/app/api/payments';

@Component({
    selector: 'dsh-webhook-events',
    templateUrl: 'webhook-events.component.html',
    styleUrls: ['webhook-events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookEventsComponent {
    @Input()
    scope: WebhookScope;

    eventType$ = combineLatest([
        this.paymentsDictionaryService.invoicesTopicEventType$,
        this.paymentsDictionaryService.customersTopicEventType$,
    ]).pipe(map(([i, c]) => ({ ...i, ...c })));

    get events(): InvoicesTopic.EventTypesEnum[] | CustomersTopic.EventTypesEnum[] {
        switch (this.scope.topic) {
            case 'InvoicesTopic':
                return (this.scope as unknown as InvoicesTopic).eventTypes;
            case 'CustomersTopic':
                return (this.scope as unknown as CustomersTopic).eventTypes;
        }
    }

    constructor(private paymentsDictionaryService: PaymentsDictionaryService) {}
}

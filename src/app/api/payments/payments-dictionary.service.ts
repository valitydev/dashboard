import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentStatus, CustomersTopic, InvoicesTopic } from '@vality/swag-payments';

import { DictionaryService } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PaymentsDictionaryService {
    invoicesTopicEventType$ = this.dictionaryService.create<InvoicesTopic.EventTypesEnum>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        InvoiceCreated: this.t.translate(
            'payments.invoicesTopicEventType.InvoiceCreated',
            null,
            'dictionary',
        ),
        InvoicePaid: this.t.translate(
            'payments.invoicesTopicEventType.InvoicePaid',
            null,
            'dictionary',
        ),
        InvoiceCancelled: this.t.translate(
            'payments.invoicesTopicEventType.InvoiceCancelled',
            null,
            'dictionary',
        ),
        InvoiceFulfilled: this.t.translate(
            'payments.invoicesTopicEventType.InvoiceFulfilled',
            null,
            'dictionary',
        ),
        PaymentStarted: this.t.translate(
            'payments.invoicesTopicEventType.PaymentStarted',
            null,
            'dictionary',
        ),
        PaymentProcessed: this.t.translate(
            'payments.invoicesTopicEventType.PaymentProcessed',
            null,
            'dictionary',
        ),
        PaymentCaptured: this.t.translate(
            'payments.invoicesTopicEventType.PaymentCaptured',
            null,
            'dictionary',
        ),
        PaymentCancelled: this.t.translate(
            'payments.invoicesTopicEventType.PaymentCancelled',
            null,
            'dictionary',
        ),
        PaymentRefunded: this.t.translate(
            'payments.invoicesTopicEventType.PaymentRefunded',
            null,
            'dictionary',
        ),
        PaymentFailed: this.t.translate(
            'payments.invoicesTopicEventType.PaymentFailed',
            null,
            'dictionary',
        ),
        PaymentRefundCreated: this.t.translate(
            'payments.invoicesTopicEventType.PaymentRefundCreated',
            null,
            'dictionary',
        ),
        PaymentRefundSucceeded: this.t.translate(
            'payments.invoicesTopicEventType.PaymentRefundSucceeded',
            null,
            'dictionary',
        ),
        PaymentRefundFailed: this.t.translate(
            'payments.invoicesTopicEventType.PaymentRefundFailed',
            null,
            'dictionary',
        ),
        PaymentUserInteractionRequested: this.t.translate(
            'payments.invoicesTopicEventType.PaymentUserInteractionRequested',
            null,
            'dictionary',
        ),
        PaymentUserInteractionCompleted: this.t.translate(
            'payments.invoicesTopicEventType.PaymentUserInteractionCompleted',
            null,
            'dictionary',
        ),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    customersTopicEventType$ = this.dictionaryService.create<CustomersTopic.EventTypesEnum>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        CustomerCreated: this.t.translate(
            'payments.customersTopicEventType.CustomerCreated',
            null,
            'dictionary',
        ),
        CustomerDeleted: this.t.translate(
            'payments.customersTopicEventType.CustomerDeleted',
            null,
            'dictionary',
        ),
        CustomerReady: this.t.translate(
            'payments.customersTopicEventType.CustomerReady',
            null,
            'dictionary',
        ),
        CustomerBindingStarted: this.t.translate(
            'payments.customersTopicEventType.CustomerBindingStarted',
            null,
            'dictionary',
        ),
        CustomerBindingSucceeded: this.t.translate(
            'payments.customersTopicEventType.CustomerBindingSucceeded',
            null,
            'dictionary',
        ),
        CustomerBindingFailed: this.t.translate(
            'payments.customersTopicEventType.CustomerBindingFailed',
            null,
            'dictionary',
        ),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    paymentStatus$ = this.dictionaryService.create<PaymentStatus.StatusEnum>(() => ({
        pending: this.t.translate('payments.paymentStatus.pending', null, 'dictionary'),
        processed: this.t.translate('payments.paymentStatus.processed', null, 'dictionary'),
        captured: this.t.translate('payments.paymentStatus.captured', null, 'dictionary'),
        cancelled: this.t.translate('payments.paymentStatus.cancelled', null, 'dictionary'),
        refunded: this.t.translate('payments.paymentStatus.refunded', null, 'dictionary'),
        failed: this.t.translate('payments.paymentStatus.failed', null, 'dictionary'),
    }));

    constructor(
        private t: TranslocoService,
        private dictionaryService: DictionaryService,
    ) {}
}

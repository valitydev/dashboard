import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Invoice, PaymentSearchResult } from '@vality/swag-anapi-v2';
import isEmpty from 'lodash-es/isEmpty';
import { Observable } from 'rxjs';

import { ComponentChanges } from '@dsh/type-utils';

import { PaymentIds } from '../../types';
import { InvoiceDetailsService } from './services/invoice-details/invoice-details.service';
import { isPaymentFlowHold } from './types/is-payment-flow-hold';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InvoiceDetailsService],
})
export class PaymentDetailsComponent implements OnChanges {
    @Input() payment: PaymentSearchResult;
    @Output() refreshPayment = new EventEmitter<PaymentIds>();

    get isHoldShown(): boolean {
        if (isPaymentFlowHold(this.payment.flow)) {
            return !isEmpty(this.payment.flow.heldUntil?.toString());
        }
        return false;
    }

    invoiceInfo$: Observable<Invoice> = this.invoiceDetails.invoice$;

    constructor(private invoiceDetails: InvoiceDetailsService) {}

    ngOnChanges({ payment }: ComponentChanges<PaymentDetailsComponent>): void {
        if (payment && payment.currentValue) {
            this.changeInvoiceID(payment.currentValue);
        }
    }

    refresh(ids: PaymentIds): void {
        this.refreshPayment.emit(ids);
    }

    private changeInvoiceID(payment: PaymentSearchResult): void {
        this.invoiceDetails.setInvoiceID(payment.invoiceID);
    }
}

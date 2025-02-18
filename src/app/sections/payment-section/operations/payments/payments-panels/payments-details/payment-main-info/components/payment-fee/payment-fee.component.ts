import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';
import isNil from 'lodash-es/isNil';

@Component({
    selector: 'dsh-payment-fee',
    templateUrl: 'payment-fee.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PaymentFeeComponent {
    @Input()
    set payment(paymentValue: PaymentSearchResult) {
        if (isNil(paymentValue)) {
            return;
        }
        this.fee = paymentValue.fee ?? 0;
        this.currency = paymentValue.currency;
        this.feePercent = this.fee / paymentValue.amount;
    }

    fee: number;
    currency: string;
    feePercent: number;
}

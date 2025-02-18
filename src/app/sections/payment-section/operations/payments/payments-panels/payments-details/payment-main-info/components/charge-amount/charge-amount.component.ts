import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';
import isNil from 'lodash-es/isNil';

@Component({
    selector: 'dsh-charge-amount',
    templateUrl: 'charge-amount.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ChargeAmountComponent {
    @Input()
    set payment(paymentValue: PaymentSearchResult) {
        if (isNil(paymentValue)) {
            return;
        }
        const fee = paymentValue.fee ?? 0;
        this.chargeAmount = paymentValue.amount - fee;
        this.currency = paymentValue.currency;
    }

    chargeAmount: number;
    currency: string;
}

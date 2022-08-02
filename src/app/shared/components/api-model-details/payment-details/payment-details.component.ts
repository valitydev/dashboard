import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-payments';

import { PaymentsDictionaryService } from '@dsh/api/payments';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDetailsComponent {
    @Input() payment: PaymentSearchResult;
    paymentStatusDict$ = this.paymentsDictionaryService.paymentStatus$;

    constructor(private paymentsDictionaryService: PaymentsDictionaryService) {}
}

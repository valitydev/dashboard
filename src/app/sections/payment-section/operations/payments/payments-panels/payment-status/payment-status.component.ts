import { Component, Input } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-payments';

import { PaymentsDictionaryService } from '@dsh/api/payments';

@Component({
    selector: 'dsh-payment-status',
    templateUrl: './payment-status.component.html',
})
export class PaymentStatusComponent {
    @Input() status: PaymentSearchResult.StatusEnum;
    paymentStatusDict$ = this.paymentsDictionaryService.paymentStatus$;

    constructor(private paymentsDictionaryService: PaymentsDictionaryService) {}
}

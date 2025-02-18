import { Component } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';
import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';
import { PaymentSystem } from '@dsh/app/api/payments';

@Component({
    selector: 'dsh-payment-system-filter',
    templateUrl: './payment-system-filter.component.html',
    styleUrls: ['./payment-system-filter.component.scss'],
    providers: createControlProviders(() => PaymentSystemFilterComponent),
    standalone: false,
})
export class PaymentSystemFilterComponent extends FormControlSuperclass<
    SearchPaymentsRequestParams['bankCardPaymentSystem']
> {
    paymentSystems = Object.values(PaymentSystem);
    bankCardPaymentSystemDict$ = this.anapiDictionaryService.bankCardPaymentSystem$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}

import { Component } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/api/anapi';
import { PaymentSystem } from '@dsh/api/payments';

@Component({
    selector: 'dsh-payment-system-filter',
    templateUrl: './payment-system-filter.component.html',
    styleUrls: ['./payment-system-filter.component.scss'],
    providers: [provideValueAccessor(PaymentSystemFilterComponent)],
})
export class PaymentSystemFilterComponent extends WrappedFormControlSuperclass<
    SearchPaymentsRequestParams['bankCardPaymentSystem']
> {
    paymentSystems = Object.values(PaymentSystem);
    bankCardPaymentSystemDict$ = this.anapiDictionaryService.bankCardPaymentSystem$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}

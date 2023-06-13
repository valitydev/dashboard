import { Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';
import { PaymentSystem } from '@dsh/app/api/payments';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-payment-system-filter',
    templateUrl: './payment-system-filter.component.html',
    styleUrls: ['./payment-system-filter.component.scss'],
    providers: [provideValueAccessor(() => PaymentSystemFilterComponent)],
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

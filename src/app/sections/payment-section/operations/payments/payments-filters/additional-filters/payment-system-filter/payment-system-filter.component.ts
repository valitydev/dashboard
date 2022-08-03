import { Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { BankCardPaymentSystem } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/api/anapi';

@Component({
    selector: 'dsh-payment-system-filter',
    templateUrl: './payment-system-filter.component.html',
    styleUrls: ['./payment-system-filter.component.scss'],
    providers: [provideValueAccessor(PaymentSystemFilterComponent)],
})
export class PaymentSystemFilterComponent extends WrappedFormControlSuperclass<BankCardPaymentSystem> {
    paymentSystems = Object.values(BankCardPaymentSystem);
    bankCardPaymentSystemDict$ = this.anapiDictionaryService.bankCardPaymentSystem$;

    constructor(injector: Injector, private anapiDictionaryService: AnapiDictionaryService) {
        super(injector);
    }
}

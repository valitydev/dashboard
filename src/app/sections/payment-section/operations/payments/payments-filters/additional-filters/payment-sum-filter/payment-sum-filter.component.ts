import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/ng-core';

import { PaymentSumFilterForm } from './types/payment-sum-filter-form';

@Component({
    selector: 'dsh-payment-sum-filter',
    templateUrl: './payment-sum-filter.component.html',
    providers: createControlProviders(() => PaymentSumFilterComponent),
})
export class PaymentSumFilterComponent extends FormGroupSuperclass<Partial<PaymentSumFilterForm>> {
    control = this.fb.group<PaymentSumFilterForm>({
        paymentAmountFrom: null,
        paymentAmountTo: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

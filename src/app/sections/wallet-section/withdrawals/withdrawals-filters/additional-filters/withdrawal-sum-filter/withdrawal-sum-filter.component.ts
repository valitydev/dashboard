import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { WithdrawalAmountForm } from './types';

@Component({
    selector: 'dsh-withdrawal-sum-filter',
    templateUrl: './withdrawal-sum-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(WithdrawalSumFilterComponent),
})
export class WithdrawalSumFilterComponent extends ValidatedControlSuperclass<WithdrawalAmountForm> {
    control = this.fb.group<WithdrawalAmountForm>({
        amountFrom: null,
        amountTo: null,
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}

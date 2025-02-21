import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/matez';

import { WithdrawalAmountForm } from './types';

@Component({
    selector: 'dsh-withdrawal-sum-filter',
    templateUrl: './withdrawal-sum-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => WithdrawalSumFilterComponent),
    standalone: false,
})
export class WithdrawalSumFilterComponent extends FormGroupSuperclass<WithdrawalAmountForm> {
    control = this.fb.group<WithdrawalAmountForm>({
        amountFrom: null,
        amountTo: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

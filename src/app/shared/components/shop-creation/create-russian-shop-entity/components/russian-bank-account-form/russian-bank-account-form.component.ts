import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createControlProviders, FormGroupSuperclass } from '@vality/ng-core';

import { RussianBankAccountForm } from './types/bank-account-form-data';

@Component({
    selector: 'dsh-russian-bank-account-form',
    templateUrl: 'russian-bank-account-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => RussianBankAccountFormComponent),
})
export class RussianBankAccountFormComponent extends FormGroupSuperclass<
    Partial<RussianBankAccountForm>
> {
    control = this.fb.group<RussianBankAccountForm>({
        account: null,
        bankName: null,
        bankPostAccount: null,
        bankBik: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

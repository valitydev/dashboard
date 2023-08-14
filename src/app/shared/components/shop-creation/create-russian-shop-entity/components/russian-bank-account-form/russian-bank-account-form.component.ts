import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createControlProviders, FormGroupSuperclass } from '@vality/ng-core';
import { BankContent } from '@vality/swag-questionary-aggr-proxy';

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
    searchControl = this.fb.control<string>('');

    constructor(private fb: FormBuilder) {
        super();
    }

    bankSelected(bank: BankContent): void {
        this.control.patchValue({
            bankName: bank?.value || null,
            bankBik: bank?.bic || null,
            bankPostAccount: bank?.correspondentAccount || null,
        });
    }
}

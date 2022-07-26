import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { BankContent } from '@vality/swag-questionary-aggr-proxy';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { RussianBankAccountForm } from './types/bank-account-form-data';

@Component({
    selector: 'dsh-russian-bank-account-form',
    templateUrl: 'russian-bank-account-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(RussianBankAccountFormComponent),
})
export class RussianBankAccountFormComponent extends ValidatedControlSuperclass<RussianBankAccountForm> {
    control = this.fb.group<RussianBankAccountForm>({
        account: null,
        bankName: null,
        bankPostAccount: null,
        bankBik: null,
    });
    searchControl = this.fb.control<string>('');

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    bankSelected(bank: BankContent): void {
        this.control.patchValue({
            bankName: bank?.value || null,
            bankBik: bank?.bic || null,
            bankPostAccount: bank?.correspondentAccount || null,
        });
    }
}

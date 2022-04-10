import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { PayoutToolForm } from '../payout-tool-form/types/payout-tool-form';

export interface InternationalBankAccountForm {
    payoutTool: PayoutToolForm;
    currency: string;
    correspondentPayoutTool?: PayoutToolForm;
}

@Component({
    selector: 'dsh-international-bank-account-form',
    templateUrl: 'international-bank-account-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(InternationalBankAccountFormComponent),
})
export class InternationalBankAccountFormComponent extends ValidatedWrappedAbstractControlSuperclass<InternationalBankAccountForm> {
    control = this.fb.group<InternationalBankAccountForm>({
        payoutTool: null,
        currency: '',
        correspondentPayoutTool: { value: null, disabled: true },
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    toggleCorrespondentPayoutTool(): void {
        const { correspondentPayoutTool } = this.control.controls;
        if (correspondentPayoutTool.disabled) correspondentPayoutTool.enable();
        else correspondentPayoutTool.disable();
    }
}

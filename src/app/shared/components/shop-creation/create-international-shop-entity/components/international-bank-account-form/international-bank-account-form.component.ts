import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

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
    providers: createControlProviders(() => InternationalBankAccountFormComponent),
})
export class InternationalBankAccountFormComponent extends ValidatedControlSuperclass<
    Partial<InternationalBankAccountForm>
> {
    control = this.fb.group({
        payoutTool: null,
        currency: '',
        correspondentPayoutTool: { value: null, disabled: true },
    }) as FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    toggleCorrespondentPayoutTool(): void {
        const { correspondentPayoutTool } = this.control.controls;
        if (correspondentPayoutTool.disabled) correspondentPayoutTool.enable();
        else correspondentPayoutTool.disable();
    }
}

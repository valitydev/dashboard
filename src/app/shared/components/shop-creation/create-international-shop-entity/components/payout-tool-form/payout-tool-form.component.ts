import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { createControlProviders, FormGroupSuperclass } from '@vality/ng-core';

import { PayoutToolForm } from './types/payout-tool-form';
import { payoutToolFormValidator } from './utils/payout-tool-form-validator';

@Component({
    selector: 'dsh-payout-tool-form',
    templateUrl: 'payout-tool-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => PayoutToolFormComponent),
})
export class PayoutToolFormComponent extends FormGroupSuperclass<Partial<PayoutToolForm>> {
    control = this.fb.group(
        {
            number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
            iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
            bic: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
            abaRtn: ['', [Validators.pattern(/^[0-9]{9}$/)]],
            name: ['', [Validators.maxLength(100)]],
            country: '',
            address: ['', [Validators.maxLength(1000)]],
        },
        { validators: payoutToolFormValidator }
    );

    constructor(private fb: FormBuilder) {
        super();
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { PayoutToolForm } from './types/payout-tool-form';
import { payoutToolFormValidator } from './utils/payout-tool-form-validator';

@Component({
    selector: 'dsh-payout-tool-form',
    templateUrl: 'payout-tool-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => PayoutToolFormComponent),
})
export class PayoutToolFormComponent extends ValidatedControlSuperclass<PayoutToolForm> {
    control = this.fb.group<PayoutToolForm>(
        {
            number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
            iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
            bic: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
            abaRtn: ['', [Validators.pattern(/^[0-9]{9}$/)]],
            name: ['', [Validators.maxLength(100)]],
            country: '',
            address: ['', [Validators.maxLength(1000)]],
        },
        { validator: payoutToolFormValidator }
    );

    constructor(private fb: FormBuilder) {
        super();
    }
}

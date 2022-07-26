import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { binValidator, lastDigitsValidator } from '@dsh/components/form-controls';
import { ValidatedControlSuperclass, createValidatedAbstractControlProviders } from '@dsh/utils';

import { CardFilterForm } from './types';

@Component({
    selector: 'dsh-card-filter',
    templateUrl: './card-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(CardFilterComponent),
})
export class CardFilterComponent extends ValidatedControlSuperclass<CardFilterForm> {
    control = this.fb.group<CardFilterForm>({
        bin: ['', binValidator],
        pan: ['', lastDigitsValidator],
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}

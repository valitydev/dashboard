import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { binValidator, lastDigitsValidator } from '@dsh/components/form-controls';
import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { CardFilterForm } from './types';

@Component({
    selector: 'dsh-card-filter',
    templateUrl: './card-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CardFilterComponent),
})
export class CardFilterComponent extends ValidatedControlSuperclass<CardFilterForm> {
    control = this.fb.group({
        bin: ['', binValidator],
        pan: ['', lastDigitsValidator],
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

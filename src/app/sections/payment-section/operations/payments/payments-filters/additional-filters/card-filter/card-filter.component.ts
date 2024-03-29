import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/ng-core';

import { binValidator, lastDigitsValidator } from '@dsh/components/form-controls';

import { CardFilterForm } from './types';

@Component({
    selector: 'dsh-card-filter',
    templateUrl: './card-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CardFilterComponent),
})
export class CardFilterComponent extends FormGroupSuperclass<CardFilterForm> {
    control = this.fb.group({
        bin: ['', binValidator],
        pan: ['', lastDigitsValidator],
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

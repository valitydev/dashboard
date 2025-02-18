import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/matez';

import { binValidator, panValidator } from '@dsh/components/form-controls';

import { CardFilterForm } from './types';

@Component({
    selector: 'dsh-card-filter',
    templateUrl: './card-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CardFilterComponent),
    styles: `
        .bin ::ng-deep.mat-mdc-form-field-infix {
            max-width: calc(1ch * 7);
        }
    `,
    standalone: false,
})
export class CardFilterComponent extends FormGroupSuperclass<CardFilterForm> {
    control = this.fb.group({
        bin: ['', binValidator],
        pan: ['', panValidator],
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { MainFiltersForm } from './types/main-filters-form';

@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => MainFiltersComponent),
})
export class MainFiltersComponent extends ValidatedControlSuperclass<MainFiltersForm> {
    control = this.fb.group({
        payerEmail: ['', Validators.email],
        customerID: [''],
        rrn: ['', Validators.pattern(new RegExp(/^\d+$/))],
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/matez';

import { MainFiltersForm } from './types/main-filters-form';

@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => MainFiltersComponent),
    standalone: false,
})
export class MainFiltersComponent extends FormGroupSuperclass<Partial<MainFiltersForm>> {
    control = this.fb.group({
        payerEmail: ['', Validators.email],
        customerID: [''],
        rrn: ['', Validators.pattern(new RegExp(/^\d+$/))],
        externalID: [''],
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

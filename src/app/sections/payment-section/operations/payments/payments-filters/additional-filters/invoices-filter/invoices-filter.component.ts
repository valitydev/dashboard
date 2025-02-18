import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/matez';

import { InvoicesFilterForm } from './types';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoicesFilterComponent),
    standalone: false,
})
export class InvoicesFilterComponent extends FormGroupSuperclass<InvoicesFilterForm> {
    control = this.fb.group({
        invoiceIDs: null,
    }) as FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }
}

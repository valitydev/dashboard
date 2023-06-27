import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { InvoicesFilterForm } from './types';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoicesFilterComponent),
})
export class InvoicesFilterComponent extends ValidatedControlSuperclass<InvoicesFilterForm> {
    control = this.fb.group({
        invoiceIDs: null,
    }) as FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }
}

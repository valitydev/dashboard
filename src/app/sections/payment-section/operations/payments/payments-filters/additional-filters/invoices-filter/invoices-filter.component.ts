import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { InvoicesFilterForm } from './types';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoicesFilterComponent),
})
export class InvoicesFilterComponent extends ValidatedControlSuperclass<InvoicesFilterForm> {
    control = this.fb.group<InvoicesFilterForm>({
        invoiceIDs: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

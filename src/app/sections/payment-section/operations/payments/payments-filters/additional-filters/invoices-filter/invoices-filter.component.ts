import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ValidatedControlSuperclass, createValidatedAbstractControlProviders } from '@dsh/utils';

import { InvoicesFilterForm } from './types';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(InvoicesFilterComponent),
})
export class InvoicesFilterComponent extends ValidatedControlSuperclass<InvoicesFilterForm> {
    control = this.fb.group<InvoicesFilterForm>({
        invoiceIDs: null,
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}

import { Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-invoices-field',
    templateUrl: 'invoices-field.component.html',
    providers: [provideValueAccessor(() => InvoicesFieldComponent)],
})
export class InvoicesFieldComponent extends WrappedFormControlSuperclass<string[]> {}

import { Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { provideValueAccessor } from '@vality/ng-core';

@Component({
    selector: 'dsh-invoices-field',
    templateUrl: 'invoices-field.component.html',
    providers: [provideValueAccessor(() => InvoicesFieldComponent)],
})
export class InvoicesFieldComponent extends WrappedFormControlSuperclass<string[]> {}

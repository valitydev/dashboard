import { Component } from '@angular/core';
import { FormControlSuperclass, provideValueAccessor } from '@vality/ng-core';

@Component({
    selector: 'dsh-invoices-field',
    templateUrl: 'invoices-field.component.html',
    providers: [provideValueAccessor(() => InvoicesFieldComponent)],
})
export class InvoicesFieldComponent extends FormControlSuperclass<string[]> {}

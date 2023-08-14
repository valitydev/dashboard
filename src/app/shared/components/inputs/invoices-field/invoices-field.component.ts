import { Component } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';

@Component({
    selector: 'dsh-invoices-field',
    templateUrl: 'invoices-field.component.html',
    providers: createControlProviders(() => InvoicesFieldComponent),
})
export class InvoicesFieldComponent extends FormControlSuperclass<string[]> {}

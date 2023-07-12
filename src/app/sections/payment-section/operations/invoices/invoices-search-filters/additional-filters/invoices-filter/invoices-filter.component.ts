import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoicesFilterComponent),
})
export class InvoicesFilterComponent extends FormControlSuperclass<string[]> {}

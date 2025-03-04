import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoicesFilterComponent),
    standalone: false,
})
export class InvoicesFilterComponent extends FormControlSuperclass<string[]> {}

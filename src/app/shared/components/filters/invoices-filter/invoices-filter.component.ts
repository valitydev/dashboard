import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FilterSuperclass } from '@dsh/components/filter';

import { createControlProviders } from '@vality/matez';


@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: 'invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoicesFilterComponent),
    standalone: false,
})
export class InvoicesFilterComponent extends FilterSuperclass<string[]> {
    constructor(injector: Injector) {
        super(injector);
    }
}

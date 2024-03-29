import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { createControlProviders } from '@vality/ng-core';

import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: 'invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoicesFilterComponent),
})
export class InvoicesFilterComponent extends FilterSuperclass<string[]> {
    constructor(injector: Injector) {
        super(injector);
    }
}

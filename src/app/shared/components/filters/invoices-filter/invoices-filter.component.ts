import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';

import { FilterSuperclass } from '@dsh/components/filter';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: 'invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => InvoicesFilterComponent)],
})
export class InvoicesFilterComponent extends FilterSuperclass<string[]> {
    constructor(injector: Injector) {
        super(injector);
    }
}

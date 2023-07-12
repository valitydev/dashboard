import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor } from '@vality/ng-core';
import { InvoiceStatus } from '@vality/swag-anapi-v2';

import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-invoice-status-filter',
    templateUrl: 'invoice-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => InvoiceStatusFilterComponent)],
})
export class InvoiceStatusFilterComponent extends FilterSuperclass<InvoiceStatus.StatusEnum> {
    constructor(injector: Injector) {
        super(injector);
    }
}

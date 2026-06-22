import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FilterSuperclass } from '@dsh/components/filter';

import { createControlProviders } from '@vality/matez';
import { RefundStatus } from '@vality/swag-anapi-v2';


@Component({
    selector: 'dsh-refund-status-filter',
    templateUrl: 'refund-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => RefundStatusFilterComponent),
    standalone: false,
})
export class RefundStatusFilterComponent extends FilterSuperclass<RefundStatus.StatusEnum> {
    constructor(injector: Injector) {
        super(injector);
    }
}

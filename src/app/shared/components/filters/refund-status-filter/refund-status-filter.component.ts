import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { createControlProviders } from '@vality/ng-core';
import { RefundStatus } from '@vality/swag-anapi-v2';

import { FilterSuperclass } from '@dsh/components/filter';

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

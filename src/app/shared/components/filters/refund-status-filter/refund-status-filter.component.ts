import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { RefundStatus } from '@vality/swag-anapi-v2';

import { FilterSuperclass } from '@dsh/components/filter';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-refund-status-filter',
    templateUrl: 'refund-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => RefundStatusFilterComponent)],
})
export class RefundStatusFilterComponent extends FilterSuperclass<RefundStatus.StatusEnum> {
    constructor(injector: Injector) {
        super(injector);
    }
}

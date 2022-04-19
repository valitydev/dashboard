import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { RefundStatus } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-refund-status-filter',
    templateUrl: './refund-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(RefundStatusFilterComponent)],
})
export class RefundStatusFilterComponent extends WrappedFormControlSuperclass<RefundStatus.StatusEnum> {
    statuses = Object.values(RefundStatus.StatusEnum);

    constructor(injector: Injector) {
        super(injector);
    }
}

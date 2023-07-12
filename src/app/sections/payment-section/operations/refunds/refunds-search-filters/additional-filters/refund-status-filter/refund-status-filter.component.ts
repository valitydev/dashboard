import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { provideValueAccessor } from '@vality/ng-core';
import { RefundStatus } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';

@Component({
    selector: 'dsh-refund-status-filter',
    templateUrl: './refund-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => RefundStatusFilterComponent)],
})
export class RefundStatusFilterComponent extends WrappedFormControlSuperclass<RefundStatus.StatusEnum> {
    statuses = Object.values(RefundStatus.StatusEnum);
    refundStatusDict$ = this.anapiDictionaryService.refundStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';
import { RefundStatus } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';

@Component({
    selector: 'dsh-refund-status-filter',
    templateUrl: './refund-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => RefundStatusFilterComponent),
    standalone: false,
})
export class RefundStatusFilterComponent extends FormControlSuperclass<RefundStatus.StatusEnum> {
    statuses = Object.values(RefundStatus.StatusEnum);
    refundStatusDict$ = this.anapiDictionaryService.refundStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}

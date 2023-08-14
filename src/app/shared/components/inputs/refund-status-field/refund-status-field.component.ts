import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/ng-core';
import { RefundStatus } from '@vality/swag-anapi-v2';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RefundStatusLabelPipe } from './pipes/refund-status-label.pipe';
import { OPTION_LABELS } from './types/option-labels';

import StatusEnum = RefundStatus.StatusEnum;

@Component({
    selector: 'dsh-refund-status-field',
    templateUrl: 'refund-status-field.component.html',
    providers: [...createControlProviders(() => RefundStatusFieldComponent), RefundStatusLabelPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundStatusFieldComponent extends FormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        Object.keys(OPTION_LABELS).map((value: StatusEnum) =>
            this.refundStatusLabelPipe.transform(value).pipe(map((label) => ({ value, label }))),
        ),
    );

    constructor(private refundStatusLabelPipe: RefundStatusLabelPipe) {
        super();
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { provideValueAccessor, Option } from '@vality/ng-core';
import { InvoiceStatus } from '@vality/swag-anapi-v2';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InvoiceStatusLabelPipe } from './pipes/invoce-status-label.pipe';
import { OPTION_LABELS } from './types/option-labels';

import StatusEnum = InvoiceStatus.StatusEnum;

@Component({
    selector: 'dsh-invoice-status-field',
    templateUrl: 'invoice-status-field.component.html',
    providers: [provideValueAccessor(() => InvoiceStatusFieldComponent), InvoiceStatusLabelPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceStatusFieldComponent extends WrappedFormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        Object.keys(OPTION_LABELS).map((value: StatusEnum) =>
            this.invoiceStatusLabelPipe.transform(value).pipe(map((label) => ({ value, label })))
        )
    );

    constructor(private invoiceStatusLabelPipe: InvoiceStatusLabelPipe) {
        super();
    }
}

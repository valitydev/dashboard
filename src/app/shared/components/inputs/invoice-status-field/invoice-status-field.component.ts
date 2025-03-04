import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/matez';
import { InvoiceStatus } from '@vality/swag-anapi-v2';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { InvoiceStatusLabelPipe } from './pipes/invoice-status-label.pipe';
import { OPTION_LABELS } from './types/option-labels';

import StatusEnum = InvoiceStatus.StatusEnum;

@Component({
    selector: 'dsh-invoice-status-field',
    templateUrl: 'invoice-status-field.component.html',
    providers: [
        ...createControlProviders(() => InvoiceStatusFieldComponent),
        InvoiceStatusLabelPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class InvoiceStatusFieldComponent extends FormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        Object.keys(OPTION_LABELS).map((value: StatusEnum) =>
            this.invoiceStatusLabelPipe.transform(value).pipe(map((label) => ({ value, label }))),
        ),
    );

    constructor(private invoiceStatusLabelPipe: InvoiceStatusLabelPipe) {
        super();
    }
}

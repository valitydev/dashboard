import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { InvoiceStatus } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-invoice-status-filter',
    templateUrl: './invoice-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => InvoiceStatusFilterComponent)],
})
export class InvoiceStatusFilterComponent extends WrappedFormControlSuperclass<InvoiceStatus.StatusEnum> {
    statuses = Object.values(InvoiceStatus.StatusEnum);
    invoiceStatusDict$ = this.anapiDictionaryService.invoiceStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}

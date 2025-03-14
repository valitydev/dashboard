import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';
import { InvoiceStatus } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';

@Component({
    selector: 'dsh-invoice-status-filter',
    templateUrl: './invoice-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoiceStatusFilterComponent),
    standalone: false,
})
export class InvoiceStatusFilterComponent extends FormControlSuperclass<InvoiceStatus.StatusEnum> {
    statuses = Object.values(InvoiceStatus.StatusEnum);
    invoiceStatusDict$ = this.anapiDictionaryService.invoiceStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}

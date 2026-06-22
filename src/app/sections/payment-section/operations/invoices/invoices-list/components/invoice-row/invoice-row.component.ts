import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnapiDictionaryService } from '@dsh/app/api/anapi';

import { Invoice } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-invoice-row',
    templateUrl: 'invoice-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class InvoiceRowComponent {
    @Input() invoice: Invoice;

    invoiceStatusDict$ = this.anapiDictionaryService.invoiceStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}
}

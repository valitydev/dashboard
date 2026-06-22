import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnapiDictionaryService } from '@dsh/app/api/anapi';

import { Invoice } from '@vality/swag-anapi-v2';


@Component({
    selector: 'dsh-invoice-details',
    templateUrl: 'invoice-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class InvoiceDetailsComponent {
    @Input() invoice: Invoice;

    invoiceStatusDict$ = this.anapiDictionaryService.invoiceStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}
}

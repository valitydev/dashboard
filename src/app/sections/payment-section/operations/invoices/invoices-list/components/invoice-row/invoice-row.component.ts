import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-invoice-row',
    templateUrl: 'invoice-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceRowComponent {
    @Input() invoice: Invoice;
}

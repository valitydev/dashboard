import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceLine } from '@vality/swag-anapi-v2';

import { ReceiveInvoiceService } from '../../../services/receive-invoice/receive-invoice.service';

@Component({
    selector: 'dsh-invoice-cart-line',
    templateUrl: 'invoice-cart-line.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceiveInvoiceService],
    standalone: false,
})
export class InvoiceCartLineComponent {
    @Input() line: InvoiceLine;
    @Input() currency: string;
}

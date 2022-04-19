import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceLine } from '@vality/swag-anapi-v2';

import { ReceiveInvoiceService } from '../../services/receive-invoice/receive-invoice.service';

@Component({
    selector: 'dsh-invoice-cart-info',
    templateUrl: 'invoice-cart-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceiveInvoiceService],
})
export class InvoiceCartInfoComponent {
    @Input() cart: InvoiceLine[];
    @Input() currency: string;
}

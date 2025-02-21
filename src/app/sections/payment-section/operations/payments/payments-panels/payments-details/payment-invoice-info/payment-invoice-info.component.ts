import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice } from '@vality/swag-payments';

@Component({
    selector: 'dsh-payment-invoice-info',
    templateUrl: 'payment-invoice-info.component.html',
    styleUrls: ['payment-invoice-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
// TODO: implement dump component for this + shared one for operations
export class PaymentInvoiceInfoComponent {
    @Input() invoice: Invoice;

    get isLoading() {
        return this.invoice === undefined;
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Invoice, InvoiceLine } from '@vality/swag-anapi-v2';

import { ReceivePaymentsService } from './services/receive-payments/receive-payments.service';

@Component({
    selector: 'dsh-invoice-invoice-details',
    templateUrl: 'invoice-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceivePaymentsService],
    standalone: false,
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoice: Invoice;
    @Output() refreshData = new EventEmitter<void>();

    payments$ = this.receivePaymentsService.payments$;

    constructor(private receivePaymentsService: ReceivePaymentsService) {}

    ngOnInit() {
        this.receivePaymentsService.receivePayments(this.invoice.id);
    }

    isActionsAvailable(status: Invoice.StatusEnum): boolean {
        return ['paid', 'unpaid'].includes(status);
    }

    isCartAvailable(cart: InvoiceLine[]): boolean {
        return Boolean(cart?.length);
    }
}

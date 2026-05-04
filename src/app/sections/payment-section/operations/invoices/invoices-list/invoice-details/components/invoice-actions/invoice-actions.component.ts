import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Invoice } from '@vality/swag-payments';

import { CancelInvoiceService } from '../../cancel-invoice';
import { FulfillInvoiceService } from '../../fulfill-invoice';

@Component({
    selector: 'dsh-invoice-actions',
    templateUrl: 'invoice-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CancelInvoiceService, FulfillInvoiceService],
    standalone: false,
})
export class InvoiceActionsComponent {
    @Input() invoice: Invoice;
    @Output() refreshData = new EventEmitter<void>();

    constructor(
        private fulfillInvoiceService: FulfillInvoiceService,
        private cancelInvoiceService: CancelInvoiceService,
        private dr: DestroyRef,
    ) {}

    cancelInvoice(): void {
        this.cancelInvoiceService
            .cancelInvoice(this.invoice.id)
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(() => this.refreshData.emit());
    }

    fulfillInvoice(): void {
        this.fulfillInvoiceService
            .fulfillInvoice(this.invoice.id)
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(() => this.refreshData.emit());
    }
}

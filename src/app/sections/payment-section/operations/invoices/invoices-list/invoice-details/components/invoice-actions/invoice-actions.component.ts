import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Invoice } from '@vality/swag-payments';

import { DIALOG_CONFIG, DialogConfig } from '@dsh/app/sections/tokens';

import { CancelInvoiceService } from '../../cancel-invoice';
import {
    CreatePaymentLinkDialogData,
    CreatePaymentLinkDialogResponse,
    CreatePaymentLinkDialogComponent,
} from '../../create-payment-link-dialog';
import { FulfillInvoiceService } from '../../fulfill-invoice';

@Component({
    selector: 'dsh-invoice-actions',
    templateUrl: 'invoice-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CancelInvoiceService, FulfillInvoiceService],
    standalone: false
})
export class InvoiceActionsComponent {
    @Input() invoice: Invoice;
    @Output() refreshData = new EventEmitter<void>();

    constructor(
        private fulfillInvoiceService: FulfillInvoiceService,
        private cancelInvoiceService: CancelInvoiceService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private dr: DestroyRef,
    ) {}

    createPaymentLink(): void {
        this.dialog.open<
            CreatePaymentLinkDialogComponent,
            CreatePaymentLinkDialogData,
            CreatePaymentLinkDialogResponse
        >(CreatePaymentLinkDialogComponent, {
            ...this.dialogConfig.large,
            data: { invoice: this.invoice },
        });
    }

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

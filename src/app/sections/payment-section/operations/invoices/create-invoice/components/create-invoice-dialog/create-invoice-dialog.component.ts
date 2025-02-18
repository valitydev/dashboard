import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shop } from '@vality/swag-payments';

import { InvoicesService } from '@dsh/app/api/payments';

import { CreateInvoiceDialogResponse } from '../../types/create-invoice-dialog-response';

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CreateInvoiceDialogComponent {
    formControl = new FormControl();

    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, CreateInvoiceDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public shops: Shop[],
        private invoicesService: InvoicesService,
        private dr: DestroyRef,
    ) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }

    create(): void {
        this.invoicesService
            .createInvoice({
                invoiceParams: this.formControl.value,
            })
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(({ invoice }) => {
                this.dialogRef.close(invoice);
                this.formControl.reset();
            });
    }
}

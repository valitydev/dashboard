import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Shop } from '@vality/swag-payments';

import { InvoicesService } from '@dsh/app/api/payments';

import { CreateInvoiceDialogResponse } from '../../types/create-invoice-dialog-response';

@UntilDestroy()
@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceDialogComponent {
    formControl = new FormControl();

    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, CreateInvoiceDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public shops: Shop[],
        private invoicesService: InvoicesService,
    ) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }

    create(): void {
        this.invoicesService
            .createInvoice({
                invoiceParams: this.formControl.value,
            })
            .pipe(untilDestroyed(this))
            .subscribe(({ invoice }) => {
                this.dialogRef.close(invoice);
                this.formControl.reset();
            });
    }
}

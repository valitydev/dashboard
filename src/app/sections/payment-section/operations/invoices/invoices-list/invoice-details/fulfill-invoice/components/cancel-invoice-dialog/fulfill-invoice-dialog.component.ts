import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { FulfillInvoiceDialogResponse } from '../../types/fulfill-invoice-dialog-response';

@Component({
    templateUrl: 'fulfill-invoice-dialog.component.html',
    styleUrls: ['fulfill-invoice-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class FulfillInvoiceDialogComponent {
    reason = new FormControl();

    constructor(
        private dialogRef: MatDialogRef<
            FulfillInvoiceDialogComponent,
            FulfillInvoiceDialogResponse
        >,
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    accept() {
        this.dialogRef.close({ reason: this.reason.value });
    }
}

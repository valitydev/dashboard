import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupByValue } from '@vality/ng-core';

import { PaymentsService } from '@dsh/app/api/payments';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services';

import { CreateRefundForm } from '../../../../refunds/create-refund/types/create-refund-form';
import { MAX_REASON_LENGTH } from '../../../consts';
import { CancelHoldDialogData } from '../../types/cancel-hold-dialog-data';

@Component({
    selector: 'dsh-cancel-hold-dialog',
    templateUrl: './cancel-hold-dialog.component.html',
    styleUrls: ['./cancel-hold-dialog.component.scss'],
    standalone: false,
})
export class CancelHoldDialogComponent {
    maxReasonLength: number = MAX_REASON_LENGTH;
    form = this.fb.group({
        reason: ['', Validators.maxLength(this.maxReasonLength)],
    }) as unknown as FormGroupByValue<CreateRefundForm>;

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: CancelHoldDialogData,
        private dialogRef: MatDialogRef<CancelHoldDialogComponent, BaseDialogResponseStatus>,
        private fb: FormBuilder,
        private paymentsService: PaymentsService,
        private errorService: ErrorService,
    ) {}

    confirm(): void {
        const { reason } = this.form.value;
        const { invoiceID, paymentID } = this.dialogData;

        this.paymentsService
            .cancelPayment({ invoiceID, paymentID, cancelPayment: { reason } })
            .subscribe({
                next: () => {
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                error: (err: Error) => {
                    this.errorService.error(err);
                    this.dialogRef.close(BaseDialogResponseStatus.Error);
                },
            });
    }

    decline(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}

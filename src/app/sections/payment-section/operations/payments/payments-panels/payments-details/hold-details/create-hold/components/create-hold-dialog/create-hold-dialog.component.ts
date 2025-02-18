import { Component, DestroyRef, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupByValue, toMajor, toMinor } from '@vality/ng-core';
import { CaptureParams } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';

import { PaymentsService } from '@dsh/app/api/payments';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services';
import { amountValidator } from '@dsh/components/form-controls';

import { CreateRefundForm } from '../../../../refunds/create-refund/types/create-refund-form';
import { MAX_REASON_LENGTH } from '../../../consts';
import { CreateHoldDialogData } from '../../types/create-hold-dialog-data';

@Component({
    selector: 'dsh-create-hold-dialog',
    templateUrl: './create-hold-dialog.component.html',
    styleUrls: ['./create-hold-dialog.component.scss'],
    standalone: false,
})
export class CreateHoldDialogComponent {
    maxReasonLength: number = MAX_REASON_LENGTH;
    form = this.fb.group({
        reason: ['', Validators.maxLength(this.maxReasonLength)],
    }) as unknown as FormGroupByValue<CreateRefundForm>;

    isPartial = false;

    get maxAllowedAmount(): number {
        return toMajor(this.dialogData.maxAllowedAmount, this.dialogData.currency);
    }

    get currency(): string {
        return this.dialogData.currency;
    }

    get amountControl() {
        return this.form.controls.amount ?? null;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: CreateHoldDialogData,
        private dialogRef: MatDialogRef<CreateHoldDialogComponent, BaseDialogResponseStatus>,
        private fb: FormBuilder,
        private paymentsService: PaymentsService,
        private errorService: ErrorService,
        private dr: DestroyRef,
    ) {}

    confirm(): void {
        const capturePayment = this.formatParams();
        const { invoiceID, paymentID } = this.dialogData;

        this.paymentsService
            .capturePayment({ invoiceID, paymentID, capturePayment })
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(
                () => {
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                (err: Error) => {
                    this.errorService.error(err);
                    this.dialogRef.close(BaseDialogResponseStatus.Error);
                },
            );
    }

    decline(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }

    togglePartialRefund(value: boolean): void {
        this.isPartial = value;

        if (value) {
            this.addAmountControl();
        } else {
            this.removeAmountControl();
        }
    }

    private formatParams(): CaptureParams {
        const { reason, amount = null } = this.form.value;
        const { currency } = this.dialogData;
        const params: CaptureParams = {
            reason,
            currency,
        };

        if (!isNil(amount) && !isNaN(amount)) {
            params.amount = toMinor(amount, currency);
        }

        return params;
    }

    private addAmountControl(): void {
        this.form.addControl(
            'amount',
            this.fb.control(null, [
                Validators.required,
                amountValidator,
                Validators.min(1),
                Validators.max(this.maxAllowedAmount),
            ]),
        );
    }

    private removeAmountControl(): void {
        this.form.removeControl('amount');
    }
}

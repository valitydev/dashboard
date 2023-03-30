import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {
    MatLegacyDialogRef as MatDialogRef,
    MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import { FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { Refund, RefundParams } from '@vality/swag-payments';
import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';
import { map, shareReplay, take, withLatestFrom } from 'rxjs/operators';

import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { CommonError } from '@dsh/app/shared/services/error/models/common-error';
import { amountValidator } from '@dsh/components/form-controls';
import { toMajor, toMinor } from '@dsh/utils';

import { RefundsService } from '../../services/refunds/refunds.service';
import { Balance } from '../../types/balance';
import { CreateRefundDialogData } from '../../types/create-refund-dialog-data';
import { CreateRefundDialogResponse } from '../../types/create-refund-dialog-response';
import { CreateRefundDialogResponseStatus } from '../../types/create-refund-dialog-response-status';
import { CreateRefundForm } from '../../types/create-refund-form';
import { maxAvailableAmountValidator } from '../../validators/max-available-amount-validator';

const MAX_REASON_LENGTH = 100;

@Component({
    selector: 'dsh-create-refund',
    templateUrl: 'create-refund-dialog.component.html',
    styleUrls: ['create-refund-dialog.component.scss'],
    providers: [RefundsService],
})
export class CreateRefundDialogComponent implements OnInit {
    maxReasonLength: number = MAX_REASON_LENGTH;
    form: FormGroup<CreateRefundForm> = this.fb.group({
        reason: ['', Validators.maxLength(this.maxReasonLength)],
    });

    isPartialRefund = false;
    availableRefundAmount$: Observable<Balance>;

    get amountControl(): FormControl<number> | null {
        return this.form.controls.amount ?? null;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: CreateRefundDialogData,
        private dialogRef: MatDialogRef<CreateRefundDialogComponent, CreateRefundDialogResponse>,
        private fb: FormBuilder,
        private refundsService: RefundsService,
        private transloco: TranslocoService,
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {}

    ngOnInit(): void {
        this.availableRefundAmount$ = this.initAvailableRefundAmount();
    }

    confirm(): void {
        const params = this.formatRefundParams();
        const { invoiceID, paymentID } = this.dialogData;

        this.refundsService
            .createRefund(invoiceID, paymentID, params)
            .pipe(withLatestFrom(this.availableRefundAmount$), take(1))
            .subscribe({
                next: ([refund, { amount }]: [Refund, Balance]) => {
                    if (refund.error || refund.status === 'failed') {
                        this.dialogRef.close({
                            status: CreateRefundDialogResponseStatus.Error,
                        });
                        return;
                    }
                    this.notificationService.success(
                        refund.status === 'pending'
                            ? this.transloco.translate(
                                  `paymentDetails.refunds.createRefund.pending`,
                                  null,
                                  'payment-section'
                              )
                            : this.transloco.translate(
                                  `paymentDetails.refunds.createRefund.successful`,
                                  null,
                                  'payment-section'
                              )
                    );
                    this.dialogRef.close({
                        status: CreateRefundDialogResponseStatus.Success,
                        availableAmount: amount - refund.amount,
                    });
                },
                error: (err: Error) => {
                    this.handleResponseError(err);
                    this.dialogRef.close({
                        status: CreateRefundDialogResponseStatus.Error,
                    });
                },
            });
    }

    decline(): void {
        this.dialogRef.close({
            status: CreateRefundDialogResponseStatus.Cancelled,
        });
    }

    togglePartialRefund(value: boolean): void {
        this.isPartialRefund = value;

        if (value) {
            this.addAmountControl();
        } else {
            this.removeAmountControl();
        }
    }

    private initAvailableRefundAmount(): Observable<Balance> {
        const { invoiceID, paymentID, maxRefundAmount, currency } = this.dialogData;

        return this.refundsService.getRefundedAmountSum(invoiceID, paymentID).pipe(
            map((refundedSum: number) => maxRefundAmount - refundedSum),
            map((amount: number) => {
                return {
                    amount,
                    currency,
                };
            }),
            shareReplay(1)
        );
    }

    private formatRefundParams(): RefundParams {
        const { reason, amount = null } = this.form.value;
        const { currency } = this.dialogData;
        const params: RefundParams = {
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
            this.fb.control(null, {
                validators: [Validators.required, amountValidator, Validators.min(1)],
                asyncValidators: [
                    maxAvailableAmountValidator(
                        this.availableRefundAmount$.pipe(map(({ amount, currency }) => toMajor(amount, currency)))
                    ),
                ],
            })
        );
    }

    private removeAmountControl(): void {
        this.form.removeControl('amount');
    }

    private handleResponseError(err: Error): void {
        let handledError: Error = err;
        if (err instanceof HttpErrorResponse && !isEmpty(err.error?.code)) {
            handledError = new CommonError(
                err.error.code === 'invalidRequest'
                    ? this.transloco.translate(`paymentDetails.refunds.errors.invalidRequest`, null, 'payment-section')
                    : err.error.code === 'invoicePaymentAmountExceeded'
                    ? this.transloco.translate(
                          `paymentDetails.refunds.errors.invoicePaymentAmountExceeded`,
                          null,
                          'payment-section'
                      )
                    : err.error.code
            );
        }
        this.errorService.error(handledError);
    }
}

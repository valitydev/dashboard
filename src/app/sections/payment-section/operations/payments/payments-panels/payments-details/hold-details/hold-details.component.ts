import { Component, DestroyRef, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaymentFlowHold, PaymentSearchResult } from '@vality/swag-anapi-v2';
import { filter } from 'rxjs/operators';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { PaymentIds } from '../../../types/payment-ids';

import { CancelHoldService } from './cancel-hold';
import { CreateHoldService } from './create-hold';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html',
    styleUrls: ['./hold-details.component.scss'],
    standalone: false,
})
export class HoldDetailsComponent {
    @Input() payment: PaymentSearchResult;

    @Output() statusChanged = new EventEmitter<PaymentIds>();

    onHoldExpirationEnum = PaymentFlowHold.OnHoldExpirationEnum;
    statusEnum = PaymentSearchResult.StatusEnum;

    get flowHold(): PaymentFlowHold {
        return this.payment.flow as PaymentFlowHold;
    }

    get holdDate(): string {
        return this.flowHold.heldUntil?.toString() ?? '';
    }

    constructor(
        private cancelHoldService: CancelHoldService,
        private createHoldService: CreateHoldService,
        private dr: DestroyRef,
    ) {}

    cancelHold(): void {
        const payment = this.payment;
        this.cancelHoldService
            .openDialog({
                invoiceID: payment.invoiceID,
                paymentID: payment.id,
            })
            .pipe(
                takeUntilDestroyed(this.dr),
                filter(
                    (response: BaseDialogResponseStatus) =>
                        response === BaseDialogResponseStatus.Success,
                ),
            )
            .subscribe(() => {
                this.requestStatusUpdate(payment);
            });
    }

    confirmHold(): void {
        const payment = this.payment;
        this.createHoldService
            .openDialog({
                invoiceID: payment.invoiceID,
                paymentID: payment.id,
                currency: payment.currency,
                maxAllowedAmount: payment.amount,
            })
            .pipe(
                takeUntilDestroyed(this.dr),
                filter(
                    (response: BaseDialogResponseStatus) =>
                        response === BaseDialogResponseStatus.Success,
                ),
            )
            .subscribe(() => {
                this.requestStatusUpdate(payment);
            });
    }

    private requestStatusUpdate({ invoiceID, id: paymentID }: PaymentSearchResult): void {
        this.statusChanged.emit({ invoiceID, paymentID });
    }
}

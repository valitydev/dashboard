import { Injectable } from '@angular/core';
import { Refund, RefundParams } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentsService } from '@dsh/api/payments';

@Injectable()
export class RefundsService {
    constructor(private paymentsService: PaymentsService) {}

    createRefund(invoiceID: string, paymentID: string, refundParams?: RefundParams): Observable<Refund> {
        return this.paymentsService.createRefund({ invoiceID, paymentID, refundParams });
    }

    getRefundedAmountSum(invoiceID: string, paymentID: string): Observable<number> {
        return this.paymentsService.getRefunds({ invoiceID, paymentID }).pipe(
            map((refunds: Refund[]) => {
                return refunds.reduce((sumAmount: number, refund: Refund) => {
                    return sumAmount + refund.amount;
                }, 0);
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { Payment } from '@vality/swag-payments';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

import { PaymentsService } from '@dsh/app/api/payments';

export interface ReceivePaymentParams {
    invoiceID: string;
    paymentID: string;
}

@Injectable()
export class ReceivePaymentService {
    isLoading$: Observable<boolean>;
    errorOccurred$: Observable<boolean>;
    payment$: Observable<Payment>;

    private receivePayment$ = new Subject<ReceivePaymentParams>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<boolean>();
    private receivedPayment$ = new ReplaySubject<Payment>();

    constructor(private paymentsService: PaymentsService) {
        this.isLoading$ = this.loading$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();
        this.payment$ = this.receivedPayment$.asObservable();
        this.receivePayment$
            .pipe(
                tap(() => this.loading$.next(true)),
                switchMap(({ invoiceID, paymentID }) =>
                    this.paymentsService.getPaymentByID({ invoiceID, paymentID }).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next(true);
                            return of('error');
                        }),
                    ),
                ),
                filter((result) => result !== 'error'),
            )
            .subscribe((payment: Payment) => {
                this.loading$.next(false);
                this.receivedPayment$.next(payment);
            });
    }

    receivePayment(params: ReceivePaymentParams) {
        this.receivePayment$.next(params);
    }
}

import { Injectable } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-payments';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { PaymentsService } from '@dsh/app/api/payments';

export interface ReceivePaymentParams {
    invoiceID: string;
    paymentID: string;
}

@Injectable()
export class ReceivePaymentService {
    isLoading$: Observable<boolean>;
    errorOccurred$: Observable<boolean>;
    payment$: Observable<PaymentSearchResult>;

    private receivePayment$ = new Subject<ReceivePaymentParams>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<boolean>();
    private receivedPayment$ = new ReplaySubject<PaymentSearchResult>();

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
                map((r) => r as PaymentSearchResult),
            )
            .subscribe((payment: PaymentSearchResult) => {
                this.loading$.next(false);
                this.receivedPayment$.next(payment);
            });
    }

    receivePayment(params: ReceivePaymentParams) {
        this.receivePayment$.next(params);
    }
}

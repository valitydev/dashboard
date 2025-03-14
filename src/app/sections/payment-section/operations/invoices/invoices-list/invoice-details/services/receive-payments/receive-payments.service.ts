import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Payment } from '@vality/swag-payments';
import moment from 'moment';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { PaymentsService } from '@dsh/app/api/payments';

@Injectable()
export class ReceivePaymentsService {
    isLoading$: Observable<boolean>;
    errorOccurred$: Observable<void>;
    payments$: Observable<Payment[]>;

    private receivePayments$ = new Subject<string>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<void>();
    private receivedPayments$ = new ReplaySubject<Payment[]>(1);

    constructor(
        private paymentsService: PaymentsService,
        private dr: DestroyRef,
    ) {
        this.isLoading$ = this.loading$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();
        this.payments$ = this.receivedPayments$.asObservable();
        this.receivePayments$
            .pipe(
                tap(() => this.loading$.next(true)),
                switchMap((invoiceID) =>
                    this.paymentsService.getPayments({ invoiceID }).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        }),
                    ),
                ),
                filter((result) => result !== 'error'),
                map((r) => r as Payment[]),
                map((payments) =>
                    payments.sort(
                        (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
                    ),
                ),
                takeUntilDestroyed(this.dr),
            )
            .subscribe((payments: Payment[]) => {
                this.loading$.next(false);
                this.receivedPayments$.next(payments);
            });
    }

    receivePayments(invoiceID: string) {
        this.receivePayments$.next(invoiceID);
    }
}

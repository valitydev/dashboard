import { Injectable } from '@angular/core';
import { Invoice } from '@vality/swag-payments';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { InvoicesService } from '@dsh/app/api/payments';

@Injectable()
export class ReceiveInvoiceService {
    isLoading$: Observable<boolean>;
    errorOccurred$: Observable<boolean>;
    invoice$: Observable<Invoice>;

    private receiveInvoice$ = new Subject<string>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<boolean>();
    private receivedInvoice$ = new ReplaySubject<Invoice>();

    constructor(private invoicesService: InvoicesService) {
        this.isLoading$ = this.loading$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();
        this.invoice$ = this.receivedInvoice$.asObservable();
        this.receiveInvoice$
            .pipe(
                tap(() => this.loading$.next(true)),
                switchMap((invoiceID: string) =>
                    this.invoicesService.getInvoiceByID({ invoiceID }).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next(true);
                            return of('error');
                        }),
                    ),
                ),
                filter((result) => result !== 'error'),
                map((r) => r as Invoice),
            )
            .subscribe((invoice: Invoice) => {
                this.loading$.next(false);
                this.receivedInvoice$.next(invoice);
            });
    }

    receivePayment(invoiceID: string) {
        this.receiveInvoice$.next(invoiceID);
    }
}

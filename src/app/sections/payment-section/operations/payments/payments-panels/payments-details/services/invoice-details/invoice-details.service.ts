import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Invoice } from '@vality/swag-anapi-v2';
import moment from 'moment';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap, map, withLatestFrom } from 'rxjs/operators';

import { SearchService } from '@dsh/api/anapi';
import { ErrorService } from '@dsh/app/shared/services';

import { PaymentInstitutionRealmService } from '../../../../../../services';

@UntilDestroy()
@Injectable()
export class InvoiceDetailsService {
    invoice$: Observable<Invoice | null>;
    error$: Observable<Error>;

    private invoiceId$ = new ReplaySubject<string>(1);
    private invoiceData$ = new ReplaySubject<Invoice | null>(1);
    private innerErrors$ = new ReplaySubject<Error>(1);

    constructor(
        private searchService: SearchService,
        private errorService: ErrorService,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService
    ) {
        this.invoice$ = this.invoiceData$.asObservable();
        this.error$ = this.innerErrors$.asObservable();

        this.initInvoiceListener();
    }

    setInvoiceID(invoiceID: string): void {
        this.invoiceId$.next(invoiceID);
    }

    private initInvoiceListener(): void {
        this.invoiceId$
            .pipe(
                distinctUntilChanged(),
                tap(() => {
                    this.resetInvoiceData();
                }),
                withLatestFrom(this.paymentInstitutionRealmService.realm$),
                switchMap(([invoiceID, paymentInstitutionRealm]) => {
                    return this.searchService.searchInvoices({
                        invoiceID,
                        fromTime: moment().subtract(3, 'y').startOf('d').utc().format(),
                        toTime: moment().endOf('d').utc().format(),
                        limit: 1,
                        paymentInstitutionRealm,
                    });
                }),
                map(({ result }) => result?.[0] ?? null),
                untilDestroyed(this)
            )
            .subscribe({
                next: (invoice) => {
                    this.updateInvoiceData(invoice);
                },
                error: (err: Error) => {
                    this.handleError(err);
                },
            });
    }

    private updateInvoiceData(invoice: Invoice): void {
        this.invoiceData$.next(invoice);
    }

    private resetInvoiceData(): void {
        this.invoiceData$.next(null);
    }

    private handleError(err: Error): void {
        this.innerErrors$.next(err);
        this.errorService.error(err);
    }
}

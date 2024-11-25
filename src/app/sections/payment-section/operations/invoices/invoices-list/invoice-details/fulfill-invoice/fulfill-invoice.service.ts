import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { InvoicesService } from '@dsh/app/api/payments';

import { FulfillInvoiceDialogComponent } from './components/cancel-invoice-dialog/fulfill-invoice-dialog.component';

@Injectable()
export class FulfillInvoiceService {
    constructor(
        private invoicesService: InvoicesService,
        private dialog: MatDialog,
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {}

    fulfillInvoice(invoiceID: string): Observable<void> {
        const invoiceFulfilled$ = new ReplaySubject<void>(1);
        this.dialog
            .open(FulfillInvoiceDialogComponent, {
                width: '720px',
            })
            .afterClosed()
            .pipe(
                take(1),
                filter((value) => value !== 'cancel'),
                switchMap((fulfillInvoice) =>
                    this.invoicesService.fulfillInvoice({ invoiceID, fulfillInvoice }),
                ),
            )
            .subscribe(() => {
                invoiceFulfilled$.next();
                this.log.success(
                    this.transloco.selectTranslate(
                        'operations.invoices.actions.invoiceFulfilled',
                        null,
                        'payment-section',
                    ),
                );
            });
        return invoiceFulfilled$;
    }
}

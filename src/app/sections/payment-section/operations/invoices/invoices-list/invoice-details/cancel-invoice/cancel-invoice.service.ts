import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { InvoicesService } from '@dsh/app/api/payments';

import { CancelInvoiceDialogComponent } from './components/cancel-invoice-dialog/cancel-invoice-dialog.component';

@Injectable()
export class CancelInvoiceService {
    constructor(
        private invoicesService: InvoicesService,
        private dialog: MatDialog,
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {}

    cancelInvoice(invoiceID: string): Observable<void> {
        const invoiceCancelled$ = new ReplaySubject<void>(1);
        this.dialog
            .open(CancelInvoiceDialogComponent, {
                width: '720px',
            })
            .afterClosed()
            .pipe(
                take(1),
                filter((value) => value !== 'cancel'),
                switchMap((rescindInvoice) =>
                    this.invoicesService.rescindInvoice({ invoiceID, rescindInvoice }),
                ),
            )
            .subscribe(() => {
                invoiceCancelled$.next();
                this.log.success(
                    this.transloco.selectTranslate(
                        'operations.invoices.actions.invoiceCancelled',
                        null,
                        'payment-section',
                    ),
                );
            });
        return invoiceCancelled$;
    }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { PaymentInstitution, Shop } from '@vality/swag-payments';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter, pluck, switchMap, take } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';

import { filterShopsByRealm } from '../../operators';

import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class CreateInvoiceService {
    constructor(
        private shopsDataService: ShopsDataService,
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private log: NotifyLogService,
    ) {}

    createInvoice(realm: RealmEnum): Observable<string> {
        const invoiceCreated$ = new ReplaySubject<string>(1);
        of(realm)
            .pipe(
                filterShopsByRealm(this.shopsDataService.shops$),
                switchMap((shops) =>
                    this.dialog
                        .open<CreateInvoiceDialogComponent, Shop[]>(CreateInvoiceDialogComponent, {
                            width: '720px',
                            data: shops,
                        })
                        .afterClosed(),
                ),
                take(1),
                filter((res) => res !== 'cancel'),
                pluck('id'),
            )
            .subscribe((id) => {
                invoiceCreated$.next(id);
                this.log.success(
                    this.transloco.selectTranslate(
                        'operations.invoices.actions.invoiceCreated',
                        null,
                        'payment-section',
                    ),
                );
            });
        return invoiceCreated$;
    }
}

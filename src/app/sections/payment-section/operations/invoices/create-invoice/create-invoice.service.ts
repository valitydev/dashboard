import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentInstitution, Shop } from '@vality/swag-payments';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter, pluck, switchMap, take } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';

import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';
import { filterShopsByRealm } from '../../operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class CreateInvoiceService {
    constructor(
        private shopsDataService: ShopsDataService,
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
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
                        .afterClosed()
                ),
                take(1),
                filter((res) => res !== 'cancel'),
                pluck('id')
            )
            .subscribe((id) => {
                invoiceCreated$.next(id);
                this.snackBar.open(
                    this.transloco.translate('operations.invoices.actions.invoiceCreated', null, 'payment-section'),
                    'OK',
                    {
                        duration: 2000,
                    }
                );
            });
        return invoiceCreated$;
    }
}

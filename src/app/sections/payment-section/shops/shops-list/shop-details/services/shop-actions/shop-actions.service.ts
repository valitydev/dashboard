import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { ShopsService } from '@dsh/app/api/payments';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ShopActionResult } from '../../types/shop-action-result';

@Injectable()
export class ShopActionsService {
    constructor(
        private shopsService: ShopsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    suspend(shopID: string): Observable<ShopActionResult> {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopsService.suspendShopForParty({ shopID })),
                map(() => {
                    this.snackBar.open(
                        this.transloco.translate('shops.suspend.success', null, 'payment-section'),
                        'OK',
                        {
                            duration: 3000,
                        }
                    );
                    return ShopActionResult.Success;
                }),
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('shops.suspend.error', null, 'payment-section'), 'OK');
                    return of(ShopActionResult.Error);
                })
            );
    }

    activate(shopID: string): Observable<ShopActionResult> {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopsService.activateShopForParty({ shopID })),
                map(() => {
                    this.snackBar.open(
                        this.transloco.translate('shops.activate.success', null, 'payment-section'),
                        'OK',
                        {
                            duration: 3000,
                        }
                    );
                    return ShopActionResult.Success;
                }),
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('shops.activate.error', null, 'payment-section'), 'OK');
                    return of(ShopActionResult.Error);
                })
            );
    }
}

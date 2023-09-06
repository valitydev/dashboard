import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';
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
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {}

    suspend(shopID: string): Observable<ShopActionResult> {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopsService.suspendShopForParty({ shopID })),
                map(() => {
                    this.log.success(
                        this.transloco.selectTranslate(
                            'shops.suspend.success',
                            null,
                            'payment-section',
                        ),
                    );
                    return ShopActionResult.Success;
                }),
                catchError((err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate(
                            'shops.suspend.error',
                            null,
                            'payment-section',
                        ),
                    );
                    return of(ShopActionResult.Error);
                }),
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
                    this.log.success(
                        this.transloco.selectTranslate(
                            'shops.activate.success',
                            null,
                            'payment-section',
                        ),
                    );
                    return ShopActionResult.Success;
                }),
                catchError((err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate(
                            'shops.activate.error',
                            null,
                            'payment-section',
                        ),
                    );
                    return of(ShopActionResult.Error);
                }),
            );
    }
}

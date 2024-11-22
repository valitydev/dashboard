import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { filter } from 'rxjs/operators';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import {
    CreateShopDialogComponent,
    CreateShopDialogData,
} from './components/create-shop-dialog/create-shop-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class ShopCreationService {
    constructor(
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private log: NotifyLogService,
    ) {}

    createShop(data: CreateShopDialogData = {}): void {
        this.dialog
            .open<CreateShopDialogComponent, CreateShopDialogData, BaseDialogResponseStatus>(
                CreateShopDialogComponent,
                { data },
            )
            .afterClosed()
            .pipe(filter((response) => response === BaseDialogResponseStatus.Success))
            .subscribe(() => {
                this.log.success(
                    this.transloco.selectTranslate('shopCreation.created', null, 'components'),
                );
            });
    }
}

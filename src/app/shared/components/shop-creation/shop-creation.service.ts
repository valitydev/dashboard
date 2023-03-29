import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';
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
    constructor(private dialog: MatDialog, private transloco: TranslocoService, private snackBar: MatSnackBar) {}

    createShop(data: CreateShopDialogData = {}): void {
        this.dialog
            .open<CreateShopDialogComponent, CreateShopDialogData, BaseDialogResponseStatus>(
                CreateShopDialogComponent,
                { data }
            )
            .afterClosed()
            .pipe(filter((response) => response === BaseDialogResponseStatus.Success))
            .subscribe(() => {
                this.snackBar.open(this.transloco.translate('shopCreation.created', null, 'components'), 'OK');
            });
    }
}

import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shop } from '@vality/swag-payments';
import { Observable } from 'rxjs';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { SHOPS } from '@dsh/app/shared/components/inputs/shop-field';

import { ShopType } from './types/shop-type';

export interface CreateShopDialogData {
    shops$?: Observable<Shop[]>;
}

@Component({
    selector: 'dsh-create-shop-dialog',
    templateUrl: 'create-shop-dialog.component.html',
    styleUrls: ['create-shop-dialog.component.scss'],
    providers: [
        {
            provide: SHOPS,
            deps: [MAT_DIALOG_DATA],
            useFactory: ({ shops$ }: CreateShopDialogData = {}) => shops$,
        },
    ],
    standalone: false,
})
export class CreateShopDialogComponent {
    selectedShopType: ShopType;
    selectionConfirmed = false;
    shopType = ShopType;

    constructor(
        public dialogRef: MatDialogRef<CreateShopDialogComponent, BaseDialogResponseStatus>,
    ) {}

    onTypeChange(type: ShopType): void {
        this.selectedShopType = type;
    }

    next(): void {
        this.selectionConfirmed = true;
    }

    sendClaim(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Success);
    }

    cancelClaim(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}

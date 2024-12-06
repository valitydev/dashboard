import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ContractDetailsModule } from '@dsh/app/shared/components';
import { ShopContractDetailsModule } from '@dsh/app/shared/services/shop-contract-details';
import { DetailsItemModule } from '@dsh/components/layout';

import { ShopBalanceModule } from '../shop-balance';

import { ShopActionsComponent } from './components/shop-actions/shop-actions.component';
import { ShopContractDetailsComponent } from './components/shop-contract-details/shop-contract-details.component';
import { ShopIdComponent } from './components/shop-id/shop-id.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import { CategoryService } from './services/category/category.service';
import { ShopDetailsComponent } from './shop-details.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        TranslocoModule,
        MatDividerModule,
        DetailsItemModule,
        ClipboardModule,
        ContractDetailsModule,
        ShopBalanceModule,
        MatSnackBarModule,
        MatDialogModule,
        ShopContractDetailsModule,
    ],
    declarations: [
        ShopDetailsComponent,
        ShopContractDetailsComponent,
        ShopActionsComponent,
        ShopIdComponent,
        ShopInfoComponent,
    ],
    exports: [ShopDetailsComponent],
    providers: [CategoryService],
})
export class ShopDetailsModule {}

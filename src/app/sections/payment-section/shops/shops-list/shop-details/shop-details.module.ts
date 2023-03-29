import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ContractDetailsModule, PayoutToolModule } from '@dsh/app/shared/components';
import { ShopContractDetailsModule } from '@dsh/app/shared/services/shop-contract-details';
import { ButtonModule } from '@dsh/components/buttons';
import { DetailsItemModule } from '@dsh/components/layout';

import { ShopBalanceModule } from '../shop-balance';
import { ShopActionsComponent } from './components/shop-actions/shop-actions.component';
import { ShopContractDetailsComponent } from './components/shop-contract-details/shop-contract-details.component';
import { ShopIdComponent } from './components/shop-id/shop-id.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import { ShopPayoutToolDetailsComponent } from './components/shop-payout-tool-details/shop-payout-tool-details.component';
import { CategoryService } from './services/category/category.service';
import { ShopDetailsComponent } from './shop-details.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        MatDividerModule,
        DetailsItemModule,
        ClipboardModule,
        ContractDetailsModule,
        PayoutToolModule,
        ShopBalanceModule,
        MatSnackBarModule,
        MatDialogModule,
        ShopContractDetailsModule,
    ],
    declarations: [
        ShopDetailsComponent,
        ShopContractDetailsComponent,
        ShopPayoutToolDetailsComponent,
        ShopActionsComponent,
        ShopIdComponent,
        ShopInfoComponent,
    ],
    exports: [ShopDetailsComponent],
    providers: [CategoryService],
})
export class ShopDetailsModule {}

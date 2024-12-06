import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ActionsModule } from '@dsh/app/shared/components/actions';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ShopCreationService } from '@dsh/app/shared/components/shop-creation/shop-creation.service';
import { ShopContractDetailsModule } from '@dsh/app/shared/services/shop-contract-details';

import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { CreateInternationalShopEntityModule } from './create-international-shop-entity';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        TranslocoModule,
        MatDialogModule,
        FlexLayoutModule,
        MatRadioModule,
        CreateInternationalShopEntityModule,
        BaseDialogModule,
        ShopContractDetailsModule,
        ActionsModule,
    ],
    declarations: [CreateShopDialogComponent],
    providers: [ShopCreationService],
})
export class ShopCreationModule {}

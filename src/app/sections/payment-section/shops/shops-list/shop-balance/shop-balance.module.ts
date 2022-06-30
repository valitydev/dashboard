import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmountCurrencyModule } from '@dsh/app/shared/pipes';

import { ShopBalanceComponent } from './shop-balance.component';

@NgModule({
    imports: [CommonModule, AmountCurrencyModule],
    declarations: [ShopBalanceComponent],
    exports: [ShopBalanceComponent],
})
export class ShopBalanceModule {}

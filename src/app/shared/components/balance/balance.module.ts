import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmountCurrencyModule } from '@dsh/app/shared/pipes';

import { BalanceComponent } from './balance.component';

@NgModule({
    imports: [CommonModule, AmountCurrencyModule],
    declarations: [BalanceComponent],
    exports: [BalanceComponent],
})
export class BalanceModule {}

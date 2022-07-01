import { NgModule } from '@angular/core';

import { AmountCurrencyPipe } from './amount-currency.pipe';

@NgModule({
    declarations: [AmountCurrencyPipe],
    exports: [AmountCurrencyPipe],
})
export class AmountCurrencyModule {}

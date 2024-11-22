import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AmountCurrencyModule } from '@dsh/app/shared/pipes';

import { BalancesComponent } from './balances.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, AmountCurrencyModule],
    declarations: [BalancesComponent],
    exports: [BalancesComponent],
})
export class BalancesModule {}

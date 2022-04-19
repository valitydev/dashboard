import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';

import { BalancesComponent } from './balances.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, ToMajorModule],
    declarations: [BalancesComponent],
    exports: [BalancesComponent],
})
export class BalancesModule {}

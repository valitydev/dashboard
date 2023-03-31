import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { StatItemComponent } from './stat-item.component';
import { PercentDifferenceModule } from '../percent-difference';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        CardModule,
        SpinnerModule,
        TranslocoModule,
        PercentDifferenceModule,
        AmountCurrencyModule,
    ],
    declarations: [StatItemComponent],
    exports: [StatItemComponent],
})
export class StatItemModule {}

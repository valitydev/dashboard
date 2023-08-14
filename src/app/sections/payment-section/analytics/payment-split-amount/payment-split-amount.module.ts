import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '@dsh/components/charts/bar-chart';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { BarChartItemModule } from '../bar-chart-item/bar-chart-item.module';

import { PaymentSplitAmountComponent } from './payment-split-amount.component';

@NgModule({
    imports: [
        CommonModule,
        CardModule,
        BarChartModule,
        FlexModule,
        SpinnerModule,
        TranslocoModule,
        BarChartItemModule,
    ],
    exports: [PaymentSplitAmountComponent],
    declarations: [PaymentSplitAmountComponent],
})
export class PaymentSplitAmountModule {}

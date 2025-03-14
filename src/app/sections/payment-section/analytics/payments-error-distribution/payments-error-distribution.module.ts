import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { BarChartModule } from '@dsh/components/charts/bar-chart';
import { DonutChartModule } from '@dsh/components/charts/donut-chart';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { DonutChartItemModule } from '../donut-chart-item/donut-chart-item.module';

import { PaymentsErrorDistributionComponent } from './payments-error-distribution.component';

@NgModule({
    imports: [
        CommonModule,
        CardModule,
        BarChartModule,
        FlexModule,
        SpinnerModule,
        TranslocoModule,
        DonutChartModule,
        DonutChartItemModule,
    ],
    declarations: [PaymentsErrorDistributionComponent],
    exports: [PaymentsErrorDistributionComponent],
})
export class PaymentsErrorDistributionModule {}

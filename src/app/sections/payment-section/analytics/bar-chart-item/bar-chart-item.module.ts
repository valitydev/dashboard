import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BarChartModule } from '@dsh/components/charts';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { BarChartItemComponent } from './bar-chart-item.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        CardModule,
        SpinnerModule,
        TranslocoModule,
        BarChartModule,
    ],
    declarations: [BarChartItemComponent],
    exports: [BarChartItemComponent],
})
export class BarChartItemModule {}

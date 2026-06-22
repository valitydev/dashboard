import { NgApexchartsModule } from 'ng-apexcharts';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarChartComponent } from './bar-chart.component';

@NgModule({
    declarations: [BarChartComponent],
    exports: [BarChartComponent],
    imports: [CommonModule, NgApexchartsModule],
})
export class BarChartModule {}

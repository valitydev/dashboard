import { NgApexchartsModule } from 'ng-apexcharts';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DonutChartComponent } from './donut-chart.component';

@NgModule({
    declarations: [DonutChartComponent],
    exports: [DonutChartComponent],
    imports: [CommonModule, NgApexchartsModule],
})
export class DonutChartModule {}

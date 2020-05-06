import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import 'd3-transition';

import { LayoutModule } from '@dsh/components/layout';

import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsService } from './charts.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { DonutChartService } from './donut-chart/donut-chart.service';
import { LegendTooltipService } from './legend-tooltip/legend-tooltip.service';
import { LegendComponent } from './legend/legend.component';
import { LinearChartComponent } from './linear-chart/linear-chart.component';

const EXPORTED_DECLARATIONS = [DonutChartComponent, BarChartComponent, LinearChartComponent, LegendComponent];

@NgModule({
    declarations: EXPORTED_DECLARATIONS,
    imports: [CommonModule, LayoutModule],
    exports: EXPORTED_DECLARATIONS,
    providers: [ChartsService, DonutChartService, LegendTooltipService]
})
export class ChartsModule {}
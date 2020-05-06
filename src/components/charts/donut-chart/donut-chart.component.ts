import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';
import { DonutChartConfig, SegmentData } from '../models/chart-data-models';
import { DonutChartService } from './donut-chart.service';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['./donut-chart.component.scss', '../legend-tooltip/_legend-tooltip-theme.scss'],
    providers: [DonutChartService, LegendTooltipService]
})
export class DonutChartComponent implements OnChanges, OnInit {
    @ViewChild('donutChart', { static: true })
    private chartContainer: ElementRef;

    @Input()
    data: SegmentData[];

    @Input()
    config: DonutChartConfig;

    constructor(private donutChartService: DonutChartService) {}

    ngOnInit() {
        const element = this.chartContainer.nativeElement;
        this.donutChartService.initChart(this.data, element, this.config);
    }

    ngOnChanges() {
        this.donutChartService.updateChart(this.data);
    }
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { ApexAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_CONFIG } from './default-config';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: 'donut-chart.component.html',
    styleUrls: ['donut-chart.component.scss'],
    standalone: false,
})
export class DonutChartComponent implements OnInit {
    @Input()
    series: ApexAxisChartSeries;

    @Input()
    labels: string[];

    @Input()
    colors?: string[];

    @Output()
    dataSelect = new EventEmitter<number>();

    config = cloneDeep(DEFAULT_CONFIG);

    ngOnInit() {
        this.config.chart.events.dataPointSelection = this.updateDataPointSelection;
    }

    updateDataPointSelection = (_: unknown, __: unknown, options?: { dataPointIndex?: number }) =>
        this.dataSelect.emit(options.dataPointIndex);
}

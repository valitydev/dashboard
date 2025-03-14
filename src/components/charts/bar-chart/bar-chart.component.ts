import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { ApexAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_CONFIG } from './default-config';

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: 'bar-chart.component.html',
    styleUrls: ['bar-chart.component.scss'],
    standalone: false,
})
export class BarChartComponent implements OnChanges {
    @Input()
    series?: ApexAxisChartSeries;

    @Input()
    colors?: string[];

    @Input()
    height?: number;

    config = cloneDeep(DEFAULT_CONFIG);

    ngOnChanges(changes: SimpleChanges) {
        if (changes.height && changes.height.currentValue !== changes.height.previousValue) {
            this.config.chart.height = this.height;
        }
    }
}

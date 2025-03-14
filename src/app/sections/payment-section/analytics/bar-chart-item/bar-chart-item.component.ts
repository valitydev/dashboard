import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { ChartData } from '../utils';

@Component({
    selector: 'dsh-bar-chart-item',
    templateUrl: 'bar-chart-item.component.html',
    standalone: false,
})
export class BarChartItemComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;
    @Input() title: string;
    @Input() chartData: ChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
    @Input() colors?: string[];

    ngOnChanges(changes: SimpleChanges) {
        if (changes.chartData?.currentValue) {
            this.error = undefined;
        }
    }
}

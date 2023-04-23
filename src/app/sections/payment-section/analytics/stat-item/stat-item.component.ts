import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';
import { coerceBoolean } from 'coerce-property';

import { StatData } from '../utils';

@Component({
    selector: 'dsh-stat-item',
    templateUrl: 'stat-item.component.html',
    styleUrls: ['./stat-item.component.scss'],
})
export class StatItemComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;
    @Input() subtitle: string;
    @Input() statData: StatData;
    @Input() isLoading: boolean;
    @Input() error: Error;
    @Input() @coerceBoolean hideCurrency = false;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.statData?.currentValue) {
            this.error = undefined;
        }
    }
}

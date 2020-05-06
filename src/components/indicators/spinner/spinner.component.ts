import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import random from 'lodash.random';

import { slateblue400 } from '../../../app/theme-manager';
import { SpinnerType } from './spinner-type';

@Component({
    selector: 'dsh-spinner',
    templateUrl: 'spinner.component.html'
})
export class SpinnerComponent implements OnChanges {
    @Input() type: SpinnerType;
    @Input() animationDuration = 1000;
    @Input() size = 50;
    activeSpinner = SpinnerType.Spring;
    spinnersCount = 7;
    color = slateblue400;

    SpinnerType = SpinnerType;

    ngOnChanges({ type }: SimpleChanges) {
        this.activeSpinner = type && type.currentValue ? type.currentValue : random(0, this.spinnersCount);
    }
}
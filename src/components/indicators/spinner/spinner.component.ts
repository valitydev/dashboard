import { Component, Input } from '@angular/core';

import { SpinnerType } from './spinner-type';
import { ThemeManager, ThemeName } from '../../../app/theme-manager';

@Component({
    selector: 'dsh-spinner',
    templateUrl: 'spinner.component.html',
})
export class SpinnerComponent {
    @Input() type: SpinnerType;
    @Input() animationDuration = 1000;
    @Input() size = 50;
    activeSpinner = SpinnerType.Spring;
    spinnersCount = 7;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    SpinnerType = SpinnerType;

    constructor(private themeManager: ThemeManager) {}

    get color(): string {
        switch (this.themeManager.current) {
            case ThemeName.PersianGreen:
                return '#003b8e';
            case ThemeName.Main:
                return '#695bff';
            case ThemeName.Eastern:
                return '#2597a1';
        }
    }
}

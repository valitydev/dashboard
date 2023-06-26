import { Component, Input } from '@angular/core';

import { ThemeManager, ThemeName } from '@dsh/app/theme-manager';

@Component({
    selector: 'dsh-spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    @Input() size = 50;
    @Input() animationDuration = 1000;

    constructor(private themeManager: ThemeManager) {}

    get spinnerStyle(): object {
        return {
            height: `${this.size}px`,
            width: `${this.size}px`,
        };
    }

    get spinnerPartStyle(): object {
        return {
            height: `${this.size / 2}px`,
            width: `${this.size}px`,
        };
    }

    get rotatorStyle(): object {
        return {
            height: `${this.size}px`,
            width: `${this.size}px`,
            borderRightColor: this.color,
            borderTopColor: this.color,
            borderWidth: `${this.size / 7}px`,
            animationDuration: `${this.animationDuration}ms`,
            animationName: '',
        };
    }

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

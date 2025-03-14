import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ComponentChanges } from '@vality/matez';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { BootstrapIconSize } from '@dsh/components/indicators/bootstrap-icon';

@Component({
    selector: 'dsh-navbar-item',
    templateUrl: 'navbar-item.component.html',
    styleUrls: ['navbar-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class NavbarItemComponent implements OnChanges {
    @Input() icon: string;
    @Input() active = false;
    @Input() withToggle = false;
    @Input() toggleChecked = false;
    @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild(MatSlideToggle, { static: false }) slideToggle: MatSlideToggle;

    iconSize$: Observable<BootstrapIconSize> = this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(pluck('matches'))
        .pipe(map((isXSmallSmall) => (isXSmallSmall ? 'lg' : 'md')));

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnChanges({ active }: ComponentChanges<NavbarItemComponent>): void {
        if (active?.currentValue !== active?.previousValue) {
            this.activeChange.next(active.currentValue);
        }
    }

    toggle(): void {
        if (!this.withToggle) {
            return;
        }
        this.slideToggle.toggle();
        this.toggleChange.emit(this.slideToggle.checked);
    }

    slideToggleChange({ checked }: MatSlideToggleChange): void {
        this.toggleChange.emit(checked);
    }
}

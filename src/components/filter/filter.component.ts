import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    booleanAttribute,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { map, pluck } from 'rxjs/operators';

import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';

@Component({
    selector: 'dsh-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FilterComponent {
    @Input() label: string;
    @Input() activeLabel: string;
    @Input() content: TemplateRef<unknown>;
    @Input({ transform: booleanAttribute }) active = false;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) noClearButton = false;

    @Output() save = new EventEmitter<void>();
    @Output() clear = new EventEmitter<void>();

    isMobile$ = this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(pluck('matches'), map(Boolean));

    constructor(
        private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog,
        private dr: DestroyRef,
    ) {}

    open(): void {
        if (this.breakpointObserver.isMatched([Breakpoints.XSmall, Breakpoints.Small])) {
            this.dialog
                .open(FilterDialogComponent, {
                    data: {
                        noClearButton: this.noClearButton,
                        content: this.content,
                        label: this.label,
                        clear: this.clear,
                    },
                })
                .afterClosed()
                .pipe(takeUntilDestroyed(this.dr))
                .subscribe((result) => {
                    switch (result) {
                        case 'save':
                            this.save.emit();
                            return;
                    }
                });
        }
    }
}

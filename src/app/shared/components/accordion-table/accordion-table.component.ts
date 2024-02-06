import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { PossiblyAsync } from '@vality/ng-core';
import { of, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { StatusColor } from '@dsh/app/theme-manager';

import { ExpandedFragment } from './expanded-fragment';

const HIDED_BREAKPOINTS = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
];

export interface Column<T extends object> {
    label: PossiblyAsync<string>;
    width?: string;
    hide?: boolean | string; // Material Breakpoint
    field?: (row: T, columns: Column<T>) => unknown; // | string
    type?: 'daterange' | 'datetime' | 'tag';
    typeParameters?: {
        color: Record<PropertyKey, StatusColor>;
        label: Observable<Record<PropertyKey, string>>;
    };
}

export interface ContentHeader<T extends object> {
    label: (row: T) => Observable<unknown>;
}

@Component({
    selector: 'dsh-accordion-table',
    templateUrl: './accordion-table.component.html',
    styles: [],
})
export class AccordionTableComponent<T extends object> {
    @Input() lastUpdated: string;
    @Input() columns: Column<T>[];
    @Input() contentHeader: ContentHeader<T>[];
    @Input() data: T[];
    @Input() inProgress: boolean;
    @Input() hasMore: boolean;
    @Input() error?: string;

    @Output() update = new EventEmitter<void>();
    @Output() more = new EventEmitter<void>();

    @Input() expanded?: ExpandedFragment;

    @ContentChild(TemplateRef, { static: true }) contentTemplate!: TemplateRef<unknown>;

    constructor(private breakpointObserver: BreakpointObserver) {}

    isHided(hide: Column<T>['hide']) {
        if (hide === true) {
            return of(true);
        }
        if (!hide) {
            return of(false);
        }
        const idx = HIDED_BREAKPOINTS.findIndex((h) => h === hide);
        return this.breakpointObserver.observe(HIDED_BREAKPOINTS.slice(0, idx)).pipe(
            map((s) => s.matches),
            startWith(false),
        );
    }
}

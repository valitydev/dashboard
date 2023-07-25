import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { StatusColor } from '@dsh/app/theme-manager';

const HIDED_BREAKPOINTS = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
];

export interface Column<T extends object> {
    label: string;
    width?: string;
    hide?: boolean | string; // Material Breakpoint
    field?: (row: T, columns: Column<T>) => unknown; // | string
    type?: 'daterange' | 'datetime' | 'tag';
    typeParameters?: {
        color: Record<PropertyKey, StatusColor>;
        label: Record<PropertyKey, string>;
    };
}

export interface ContentHeader<T extends object> {
    label: (row: T) => unknown;
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

    @Input() expanded: number;
    @Output() expandedChange = new EventEmitter<number>();

    @ContentChild(TemplateRef, { static: true }) contentTemplate!: TemplateRef<unknown>;

    constructor(private breakpointObserver: BreakpointObserver) {}

    isHided(hide: Column<T>['hide']) {
        if (hide === true) return of(true);
        if (!hide) return of(false);
        const idx = HIDED_BREAKPOINTS.findIndex((h) => h === hide);
        return this.breakpointObserver.observe(HIDED_BREAKPOINTS.slice(0, idx)).pipe(
            map((s) => s.matches),
            startWith(false)
        );
    }
}

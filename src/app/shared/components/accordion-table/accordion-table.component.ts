import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';

export interface Column<T extends object> {
    label: string;
    width?: string;
    hide?: boolean;
    field?: (row: T, columns: Column<T>) => unknown; // | string
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

    @Output() update = new EventEmitter<void>();
    @Output() more = new EventEmitter<void>();

    @Input() expanded: number;
    @Output() expandedChange = new EventEmitter<number>();

    @ContentChild(TemplateRef, { static: true }) contentTemplate!: TemplateRef<unknown>;
}

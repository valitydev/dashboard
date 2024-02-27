import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, TemplateRef, OnChanges, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { ComponentChanges } from '@vality/ng-core';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

export type NestedTableNode<T = unknown> = {
    value: T;
    children?: NestedTableNode<T>[];
    expanded?: boolean;
};

export type NestedTableFlatNode<T = unknown> = {
    value: T;
    expandable: boolean;
    level: number;
    initExpanded: boolean;
};

export interface NestedTableColumn<T = unknown> {
    field: string;
    header: string;
    formatter?: (d: T) => string;
    style?: Record<string, unknown>;
}

function flatten<T>(node: NestedTableNode<T>, level: number): NestedTableFlatNode<T> {
    return {
        value: node.value,
        expandable: node.children?.length > 0,
        level: level,
        initExpanded: node.expanded,
    };
}

const TREE_CONTROL = new FlatTreeControl<NestedTableFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
);

const TREE_FLATTENER = new MatTreeFlattener<NestedTableNode, NestedTableFlatNode>(
    flatten,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
);

@Component({
    selector: 'dsh-nested-table',
    templateUrl: 'nested-table.component.html',
    styleUrls: ['nested-table.component.scss'],
})
export class NestedTableComponent implements OnChanges {
    @Input() data!: NestedTableNode[];
    @Input() dataSource!: MatTreeFlatDataSource<NestedTableNode, NestedTableFlatNode>;
    @Input() columns: NestedTableColumn[] = [];
    @Input() cellsTemplates: Record<string, TemplateRef<unknown>> = {};
    @Input() headersTemplates: Record<string, TemplateRef<unknown>> = {};
    @Input() footerTemplates: Record<string, TemplateRef<unknown>> = {};

    expanded!: Set<number>;

    get displayedColumns() {
        return (this.columns || []).map((c) => c.field);
    }

    constructor(private destroyRef: DestroyRef) {}

    ngOnChanges(changes: ComponentChanges<NestedTableComponent>) {
        if (changes.data && this.data?.length) {
            this.dataSource = new MatTreeFlatDataSource(TREE_CONTROL, TREE_FLATTENER);
            this.dataSource.data = this.data || [];
            const initExpanded = !this.expanded;
            if (initExpanded) {
                this.expanded = new Set<number>();
            }
            this.getFlat().subscribe((flatten) => {
                if (initExpanded) {
                    for (const [idx, d] of flatten.entries()) {
                        if (d.initExpanded) {
                            this.expanded.add(idx);
                            TREE_CONTROL.expand(d);
                        }
                    }
                } else {
                    /**
                     * TODO: in this implementation it is expected that the table does not change
                     */
                    for (const idx of this.expanded) {
                        const item = flatten[idx];
                        if (!item || !item.expandable) {
                            this.expanded.delete(idx);
                            continue;
                        }
                        TREE_CONTROL.expand(item);
                    }
                }
            });
        }
    }

    toggle(data: NestedTableFlatNode) {
        if (data.expandable) {
            TREE_CONTROL.toggle(data);
            this.getFlat().subscribe((flat) => {
                const idx = flat.findIndex((f) => f === data);
                if (TREE_CONTROL.isExpanded(data)) {
                    this.expanded.add(idx);
                } else {
                    this.expanded.delete(idx);
                }
            });
        }
    }

    isExpanded(data: NestedTableFlatNode) {
        return TREE_CONTROL.isExpanded(data);
    }

    private getFlat() {
        return this.dataSource
            .connect({ viewChange: of() })
            .pipe(first(), takeUntilDestroyed(this.destroyRef));
    }
}

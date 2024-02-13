import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
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
export class NestedTableComponent {
    @Input({
        transform: (data: NestedTableNode[]) => {
            const dataSource = new MatTreeFlatDataSource(TREE_CONTROL, TREE_FLATTENER);
            dataSource.data = data || [];
            dataSource
                .connect({ viewChange: of() })
                .pipe(first())
                .subscribe((flatten) => {
                    for (const d of flatten) {
                        if (d.initExpanded) {
                            TREE_CONTROL.expand(d);
                        }
                    }
                });
            return dataSource;
        },
    })
    data!: MatTreeFlatDataSource<NestedTableNode, NestedTableFlatNode>;
    @Input() columns: NestedTableColumn[] = [];
    @Input() cellsTemplates: Record<string, TemplateRef<unknown>> = {};
    @Input() headersTemplates: Record<string, TemplateRef<unknown>> = {};
    @Input() footerTemplates: Record<string, TemplateRef<unknown>> = {};

    get displayedColumns() {
        return (this.columns || []).map((c) => c.field);
    }

    toggle(data: NestedTableFlatNode) {
        if (data.expandable) {
            TREE_CONTROL.toggle(data);
        }
    }

    isExpanded(data: NestedTableFlatNode) {
        return TREE_CONTROL.isExpanded(data);
    }
}

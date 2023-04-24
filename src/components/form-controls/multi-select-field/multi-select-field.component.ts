import { Component, Input, OnChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { coerceBoolean } from 'coerce-property';
import isNil from 'lodash-es/isNil';

import { ComponentChanges } from '@dsh/type-utils';
import { provideValueAccessor } from '@dsh/utils';

export interface Option<T> {
    value: T;
    label?: string;
}

interface OptionScore<T> {
    option: Option<T>;
    score: number;
}

@UntilDestroy()
@Component({
    selector: 'dsh-multi-select-field',
    templateUrl: 'multi-select-field.component.html',
    styleUrls: ['multi-select-field.component.scss'],
    providers: [provideValueAccessor(() => MultiSelectFieldComponent)],
})
export class MultiSelectFieldComponent<T> extends WrappedFormControlSuperclass<T[]> implements OnChanges {
    @Input() options: Option<T>[];
    @Input() label?: string;
    @Input() @coerceBoolean noSearch = false;

    selected = new Set<T>();
    filtered: Option<T>[] = [];
    searchStr: string = '';

    @Input() searchPredicate?: (option: Option<T>, searchStr: string) => number = (option) =>
        option?.label?.includes(this.searchStr) || JSON.stringify(option.value).includes(this.searchStr) ? 1 : 0;

    ngOnChanges({ options }: ComponentChanges<MultiSelectFieldComponent<T>>): void {
        if (options) {
            this.search();
        }
    }

    handleIncomingValue(value: T[]): void {
        if (isNil(value)) this.searchStr = '';
        this.selected = new Set(value);
        this.search();
    }

    toggle({ value }: Option<T>): void {
        if (this.selected.has(value)) this.selected.delete(value);
        else this.selected.add(value);
        this.emitOutgoingValue(Array.from(this.selected.values()));
        this.search();
    }

    search(searchStr: string = this.searchStr): void {
        this.searchStr = searchStr;
        this.filtered = (this.options || [])
            .map(
                (option) =>
                    ({
                        option,
                        score: this.searchPredicate(option, searchStr),
                    } as OptionScore<T>)
            )
            .filter((v) => this.selected.has(v.option.value) || v.score > 0)
            .sort((a, b) => a.score - b.score)
            .map((v) => v.option);
    }
}

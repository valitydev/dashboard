import { OnChanges, ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { coerceBoolean } from 'coerce-property';
import { BehaviorSubject, combineLatest, defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges, provideValueAccessor } from '@dsh/utils';

import { Option } from './types';
import { filterOptions } from './utils';

@Component({
    selector: 'dsh-select-search-field',
    templateUrl: 'select-search-field.component.html',
    styleUrls: ['select-search-field.component.scss'],
    providers: [provideValueAccessor(() => SelectSearchFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchFieldComponent<Value> extends WrappedFormControlSuperclass<Value> implements OnChanges {
    @Input() label: string;
    @Input() @coerceBoolean required = false;
    @Input() options: Option<Value>[];
    @Input() hint: string | null;

    selectSearchControl = new FormControl<string>('');
    filteredOptions$: Observable<Option<Value>[]> = combineLatest([
        getFormValueChanges(this.selectSearchControl),
        defer(() => this.options$),
    ]).pipe(map(([value, options]) => filterOptions(options, value)));

    private options$ = new BehaviorSubject<Option<Value>[]>([]);

    constructor() {
        super();
    }

    ngOnChanges({ options }: ComponentChanges<SelectSearchFieldComponent<Value>>): void {
        if (options) this.options$.next(options.currentValue);
    }

    clear(event: MouseEvent): void {
        this.control.setValue(null);
        event.stopPropagation();
    }
}

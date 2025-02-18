import {
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ComponentChanges } from '@vality/ng-core';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import negate from 'lodash-es/negate';
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import { combineLatest, defer, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Preset, createDateRangeWithPreset } from '@dsh/components/date-range-filter';
import { getFormValueChanges } from '@dsh/utils';

import { AdditionalFilters, DialogFiltersComponent } from './additional-filters';
import { WithdrawalsFilters, MainFilters } from './types';

const MAIN_FILTERS_KEYS = ['dateRange'];

@Component({
    selector: 'dsh-withdrawals-filters',
    templateUrl: 'withdrawals-filters.component.html',
    standalone: false,
})
export class WithdrawalsFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: WithdrawalsFilters;
    @Output() filtersChanged = new EventEmitter<WithdrawalsFilters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group({
        dateRange: this.defaultDateRange,
    });

    isAdditionalFilterApplied$ = defer(() => this.additionalFilters$).pipe(map(negate(isEmpty)));

    private additionalFilters$ = new ReplaySubject<AdditionalFilters>();

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        combineLatest([getFormValueChanges(this.form), this.additionalFilters$])
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((filters) =>
                this.filtersChanged.next(Object.assign({}, ...filters) as MainFilters),
            );
    }

    ngOnChanges({ initParams }: ComponentChanges<WithdrawalsFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(pick(initParams.currentValue, MAIN_FILTERS_KEYS));
            this.additionalFilters$.next(omit(initParams.currentValue, MAIN_FILTERS_KEYS));
        }
    }

    openAdditionalFiltersDialog(): void {
        const data = omit(this.initParams || {}, MAIN_FILTERS_KEYS);
        this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, { data })
            .afterClosed()
            .pipe(
                filter((v) => !isEqual(v, data)),
                takeUntilDestroyed(this.dr),
            )
            .subscribe((filters) => {
                this.additionalFilters$.next(filters);
            });
    }
}

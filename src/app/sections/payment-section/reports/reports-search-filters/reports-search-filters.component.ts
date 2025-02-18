import {
    ChangeDetectionStrategy,
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
import { ComponentChanges } from '@vality/matez';
import { Report } from '@vality/swag-anapi-v2';

import {
    createDateRangeWithPreset,
    DateRangeWithPreset,
    Preset,
} from '@dsh/components/date-range-filter';
import { getFormValueChanges } from '@dsh/utils';

export interface Filters {
    reportTypes: Report.ReportTypeEnum[];
    dateRange: DateRangeWithPreset;
}

@Component({
    selector: 'dsh-reports-search-filters',
    templateUrl: 'reports-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ReportsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({ reportTypes: null, dateRange: this.defaultDateRange });

    constructor(
        private fb: FormBuilder,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((filters) => this.searchParamsChanges.next(filters as unknown as Filters));
    }

    ngOnChanges({ initParams }: ComponentChanges<ReportsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(initParams.currentValue as unknown);
        }
    }
}

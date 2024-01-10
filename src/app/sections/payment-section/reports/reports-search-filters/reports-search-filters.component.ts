import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Report } from '@vality/swag-anapi-v2';

import {
    createDateRangeWithPreset,
    DateRangeWithPreset,
    Preset,
} from '@dsh/components/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

export interface Filters {
    reportTypes: Report.ReportTypeEnum[];
    dateRange: DateRangeWithPreset;
}

@UntilDestroy()
@Component({
    selector: 'dsh-reports-search-filters',
    templateUrl: 'reports-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({ reportTypes: null, dateRange: this.defaultDateRange });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.searchParamsChanges.next(filters as unknown as Filters));
    }

    ngOnChanges({ initParams }: ComponentChanges<ReportsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue)
            {this.form.patchValue(initParams.currentValue as unknown);}
    }
}

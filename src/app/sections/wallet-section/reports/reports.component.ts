import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Report } from '@vality/swag-wallet';
import { startWith } from 'rxjs/operators';

import { QueryParamsService } from '@dsh/app/shared';
import { Column } from '@dsh/app/shared/components/accordion-table';
import { createDateRangeWithPreset, Preset, DateRange } from '@dsh/components/date-range-filter';

import { FetchReportsService } from './fetch-reports.service';

interface Form {
    dateRange: DateRange;
    identityID: string;
}

@Component({
    selector: 'dsh-reports',
    templateUrl: './reports.component.html',
    styles: [],
})
export class ReportsComponent implements OnInit {
    reports$ = this.fetchReportsService.result$;
    hasMore$ = this.fetchReportsService.hasMore$;
    isLoading$ = this.fetchReportsService.isLoading$;
    columns: Column<Report>[] = [
        { label: 'Created at', field: (r) => r.createdAt },
        { label: 'Status', field: (d) => d.status },
        { label: 'Type', field: (d) => d.type },
        { label: 'Reporting period', field: (d) => d.fromTime + '-' + d.toTime },
    ];
    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Form>({ dateRange: this.defaultDateRange, identityID: undefined, ...this.qp.params });

    constructor(
        private fetchReportsService: FetchReportsService,
        private fb: NonNullableFormBuilder,
        private qp: QueryParamsService<Partial<Form>>
    ) {
        this.load();
    }

    ngOnInit() {
        this.form.valueChanges.pipe(startWith(this.form.value)).subscribe((value) => {
            void this.qp.set(value);
        });
    }

    load() {
        const { dateRange, identityID } = this.form.value;
        this.fetchReportsService.load({
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            identityID,
        });
    }

    more() {
        this.fetchReportsService.more();
    }
}

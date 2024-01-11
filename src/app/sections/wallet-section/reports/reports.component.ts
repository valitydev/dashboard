import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Report } from '@vality/swag-wallet';
import isEqual from 'lodash-es/isEqual';
import moment from 'moment';
import { startWith, distinctUntilChanged, filter, first, map } from 'rxjs/operators';

import { WalletDictionaryService, IdentitiesService } from '@dsh/app/api/wallet';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { QueryParamsService } from '@dsh/app/shared';
import { Column, ExpandedFragment } from '@dsh/app/shared/components/accordion-table';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { StatusColor } from '@dsh/app/theme-manager';
import { createDateRangeWithPreset, Preset, DateRange } from '@dsh/components/date-range-filter';

import { CreateReportDialogComponent } from './components/create-report-dialog/create-report-dialog.component';
import { FetchReportsService } from './fetch-reports.service';

interface Form {
    dateRange: DateRange;
    identityID: string;
}

const REPORT_STATUS_COLOR = {
    [Report.StatusEnum.Created]: StatusColor.Success,
    [Report.StatusEnum.Pending]: StatusColor.Pending,
    [Report.StatusEnum.Canceled]: StatusColor.Warn,
};

@UntilDestroy()
@Component({
    selector: 'dsh-reports',
    templateUrl: './reports.component.html',
    providers: [FetchReportsService],
})
export class ReportsComponent implements OnInit {
    reports$ = this.fetchReportsService.result$;
    hasMore$ = this.fetchReportsService.hasMore$;
    isLoading$ = this.fetchReportsService.isLoading$;
    columns: Column<Report>[] = [
        {
            label: this.transloco.selectTranslate('reports.table.createdAt', {}, 'wallet-section'),
            field: (r) => r.createdAt,
            type: 'datetime',
        },
        {
            label: this.transloco.selectTranslate('reports.table.status', {}, 'wallet-section'),
            field: (d) => d.status,
            type: 'tag',
            typeParameters: {
                color: REPORT_STATUS_COLOR,
                label: this.walletDictionaryService.reportStatus$,
            },
            hide: Breakpoints.Small,
        },
        {
            label: this.transloco.selectTranslate(
                'reports.table.reportingPeriod',
                {},
                'wallet-section',
            ),
            field: (d): DateRange => ({
                start: moment(d.fromTime),
                end: moment(d.toTime),
            }),
            type: 'daterange',
            hide: Breakpoints.Medium,
        },
    ];
    contentHeader = [
        {
            label: (r) =>
                this.transloco
                    .selectTranslate('reports.report', {}, 'wallet-section')
                    .pipe(map((reportText) => `${reportText} #${r.id}`)),
        },
    ];
    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Form>({
        dateRange: this.defaultDateRange,
        identityID: undefined,
        ...this.qp.params,
    });
    lastUpdated$ = this.fetchReportsService.result$.pipe(mapToTimestamp);
    reportStatusDict$ = this.walletDictionaryService.reportStatus$;
    reportStatusColor = REPORT_STATUS_COLOR;
    expanded = new ExpandedFragment(
        this.fetchReportsService.result$,
        () => this.fetchReportsService.more(),
        this.fetchReportsService.hasMore$,
    );

    constructor(
        private fetchReportsService: FetchReportsService,
        private fb: NonNullableFormBuilder,
        private qp: QueryParamsService<Partial<Form>>,
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private walletDictionaryService: WalletDictionaryService,
        private identitiesService: IdentitiesService,
    ) {}

    ngOnInit() {
        this.identitiesService.identities$
            .pipe(first(), untilDestroyed(this))
            .subscribe((identities) => {
                if (!this.form.value.identityID && identities.length === 1) {
                    this.form.patchValue({ identityID: identities[0].id });
                }
            });
        this.form.valueChanges
            .pipe(startWith(this.form.value), distinctUntilChanged(isEqual), untilDestroyed(this))
            .subscribe((value) => {
                void this.qp.set(value);
                this.load();
            });
    }

    load() {
        const { dateRange, identityID } = this.form.value;
        if (!identityID) {
            return;
        }
        this.fetchReportsService.load({
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            identityID,
            type: 'withdrawalRegistry',
        });
    }

    more() {
        this.fetchReportsService.more();
    }

    create() {
        this.dialog
            .open(CreateReportDialogComponent, { data: { identityID: this.form.value.identityID } })
            .afterClosed()
            .pipe(
                filter((r) => r === BaseDialogResponseStatus.Success),
                untilDestroyed(this),
            )
            .subscribe(() => {
                this.load();
            });
    }
}

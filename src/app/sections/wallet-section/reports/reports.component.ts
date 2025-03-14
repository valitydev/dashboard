import { Breakpoints } from '@angular/cdk/layout';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { QueryParamsService } from '@vality/matez';
import { Report } from '@vality/swag-wallets';
import isEqual from 'lodash-es/isEqual';
import moment from 'moment';
import { distinctUntilChanged, filter, first, map, startWith } from 'rxjs/operators';

import { IdentitiesService, WalletDictionaryService } from '@dsh/app/api/wallet';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { Column, ExpandedFragment } from '@dsh/app/shared/components/accordion-table';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { StatusColor } from '@dsh/app/theme-manager';
import { DateRange, Preset, createDateRangeWithPreset } from '@dsh/components/date-range-filter';

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

@Component({
    selector: 'dsh-reports',
    templateUrl: './reports.component.html',
    providers: [FetchReportsService],
    standalone: false,
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
        private dr: DestroyRef,
    ) {}

    ngOnInit() {
        this.identitiesService.identities$
            .pipe(first(), takeUntilDestroyed(this.dr))
            .subscribe((identities) => {
                if (!this.form.value.identityID && identities.length === 1) {
                    this.form.patchValue({ identityID: identities[0].id });
                }
            });
        this.form.valueChanges
            .pipe(
                startWith(this.form.value),
                distinctUntilChanged(isEqual),
                takeUntilDestroyed(this.dr),
            )
            .subscribe((value) => {
                void this.qp.set(value);
                this.load();
            });
    }

    load() {
        const { dateRange, identityID } = this.form.value;
        this.fetchReportsService.load({
            fromTime: dateRange.start.clone().utc().format(),
            toTime: dateRange.end.clone().utc().format(),
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
                takeUntilDestroyed(this.dr),
            )
            .subscribe(() => {
                this.load();
            });
    }
}

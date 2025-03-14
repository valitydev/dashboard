import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import { QueryParamsService } from '@vality/matez';
import { Subject, combineLatest } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';

import { PaymentInstitutionRealmService, RealmMixService } from '../services';

import { CreateReportDialogComponent } from './create-report/create-report-dialog.component';
import { FetchReportsService } from './fetch-reports.service';
import { ReportsExpandedIdManager } from './reports-expanded-id-manager.service';
import { Filters, SearchFiltersParams } from './reports-search-filters';

@Component({
    templateUrl: 'reports.component.html',
    providers: [FetchReportsService, ReportsExpandedIdManager, RealmMixService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ReportsComponent implements OnInit {
    reports$ = this.fetchReportsService.searchResult$;
    isLoading$ = this.fetchReportsService.isLoading$;
    lastUpdated$ = this.fetchReportsService.lastUpdated$;
    expandedId$ = this.reportsExpandedIdManager.expandedId$;
    params$ = this.qp.params$;
    fetchErrors$ = this.fetchReportsService.errors$;
    hasMore$ = this.fetchReportsService.hasMore$;

    private createReport$ = new Subject<void>();

    constructor(
        private fetchReportsService: FetchReportsService,
        private reportsExpandedIdManager: ReportsExpandedIdManager,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private qp: QueryParamsService<Filters>,
        private realmService: PaymentInstitutionRealmService,
        private dialog: MatDialog,
        private realmMixinService: RealmMixService<SearchFiltersParams>,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        combineLatest([
            this.transloco.selectTranslate('reports.errors.fetchError', null, 'payment-section'),
            this.fetchReportsService.errors$,
        ])
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(([message]) => this.snackBar.open(message, 'OK'));
        this.realmMixinService.mixedValue$
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((v) => this.fetchReportsService.search(v));
        this.createReport$
            .pipe(
                switchMap(() => this.realmService.realm$.pipe(first())),
                switchMap((realm) =>
                    this.dialog
                        .open(CreateReportDialogComponent, { data: { realm } })
                        .afterClosed()
                        .pipe(filter((r) => r === 'created')),
                ),
                switchMap(() =>
                    this.transloco.selectTranslate(
                        'reports.createReport.successfullyCreated',
                        null,
                        'payment-section',
                    ),
                ),
                takeUntilDestroyed(this.dr),
            )
            .subscribe((message) => {
                this.snackBar.open(message, 'OK', { duration: 2000 });
                this.refresh();
            });
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...params } = p;
        this.realmMixinService.mix({
            ...params,
            fromTime: dateRange.start.clone().utc().format(),
            toTime: dateRange.end.clone().utc().format(),
            realm: null,
        });
    }

    expandedIdChange(id: number): void {
        this.reportsExpandedIdManager.expandedIdChange(id);
    }

    refresh(): void {
        this.fetchReportsService.refresh();
    }

    create(): void {
        this.createReport$.next();
    }

    fetchMore(): void {
        this.fetchReportsService.fetchMore();
    }
}

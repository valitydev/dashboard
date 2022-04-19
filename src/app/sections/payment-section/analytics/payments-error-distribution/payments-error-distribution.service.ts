import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, defer, combineLatest } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';
import { errorsDistributionToChartData } from './errors-distribution-to-chart-data';
import { getErrorTitle } from './get-error-title';
import { getSelectedErrorDistribution } from './get-selected-error-distribution';
import { subErrorsToErrorDistribution } from './sub-errors-to-error-distribution';

@Injectable()
export class PaymentsErrorDistributionService {
    currentErrorTitle$ = defer(() => this.errorDistribution$).pipe(map(({ errorCode }) => getErrorTitle(errorCode)));
    chartData$ = defer(() => this.errorDistribution$).pipe(
        map(({ subErrors }) => errorsDistributionToChartData(subErrors))
    );
    isLoading$ = inProgressFrom(
        () => this.progress$,
        () => this.errorDistribution$
    );
    error$ = attach(
        () => this.errorSub$,
        () => this.errorDistribution$
    );

    private errorDistribution$ = combineLatest([
        defer(() => this.searchParams$).pipe(
            distinctUntilChangedDeep(),
            map(searchParamsToDistributionSearchParams),
            switchMap(({ fromTime, toTime, shopIDs, realm }) =>
                this.analyticsService
                    .getPaymentsSubErrorDistribution({ fromTime, toTime, paymentInstitutionRealm: realm, shopIDs })
                    .pipe(errorTo(this.errorSub$), progressTo(this.progress$))
            ),
            pluck('result'),
            map(subErrorsToErrorDistribution)
        ),
        defer(() => this.selectedSubError$),
    ]).pipe(
        map(([errorDistribution, selectedSubErrorPath]) =>
            getSelectedErrorDistribution(errorDistribution, selectedSubErrorPath)
        ),
        shareReplayRefCount()
    );
    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private selectedSubError$ = new BehaviorSubject<number[]>([]);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }

    updateDataSelection(value: number) {
        this.selectedSubError$.next(this.selectedSubError$.getValue().concat(value));
    }

    goBackDataSelection() {
        this.selectedSubError$.next(this.selectedSubError$.getValue().slice(0, -1));
    }
}

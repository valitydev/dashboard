import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, defer, combineLatest } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { AnalyticsService, AnapiDictionaryService } from '@dsh/api/anapi';
import { DictionaryService } from '@dsh/api/utils';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';
import { errorsDistributionToChartData } from './errors-distribution-to-chart-data';
import { getSelectedErrorDistribution } from './get-selected-error-distribution';
import { subErrorsToErrorDistribution } from './sub-errors-to-error-distribution';

@Injectable()
export class PaymentsErrorDistributionService {
    currentErrorTitle$ = defer(() => combineLatest([this.errorDistribution$, this.errorLabels$])).pipe(
        map(([{ errorCode }, errorLabels]) => errorLabels[errorCode])
    );
    chartData$ = defer(() => combineLatest([this.errorDistribution$, this.errorLabels$])).pipe(
        map(([{ subErrors }, errorLabels]) => errorsDistributionToChartData(subErrors, errorLabels))
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
    private errorLabels$ = this.dictionaryService.init$.pipe(
        map(() => this.anapiDictionaryService.getErrorCodeLabels())
    );

    constructor(
        private analyticsService: AnalyticsService,
        private anapiDictionaryService: AnapiDictionaryService,
        private dictionaryService: DictionaryService
    ) {}

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

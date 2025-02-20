import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, defer } from 'rxjs';
import { map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService, AnapiDictionaryService } from '@dsh/app/api/anapi';
import { attach, distinctUntilChangedDeep, errorTo, inProgressFrom, progressTo } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';

import { paymentsToolDistributionToChartData } from './payments-tool-distribution-to-chart-data';

@Injectable()
export class PaymentsToolDistributionService {
    toolDistribution$ = defer(() => this.searchParams$).pipe(
        map(searchParamsToDistributionSearchParams),
        distinctUntilChangedDeep(),
        switchMap(({ fromTime, toTime, shopIDs, realm }) =>
            this.analyticsService
                .getPaymentsToolDistribution({
                    fromTime,
                    toTime,
                    paymentInstitutionRealm: realm,
                    shopIDs,
                })
                .pipe(errorTo(this.errorSub$), progressTo(this.progress$)),
        ),
        withLatestFrom(this.analyticsDictionaryService.paymentTool$),
        map(([{ result }, paymentToolDict]) =>
            paymentsToolDistributionToChartData(result, paymentToolDict),
        ),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.toolDistribution$);
    error$ = attach(() => this.errorSub$, this.toolDistribution$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(
        private analyticsService: AnalyticsService,
        private analyticsDictionaryService: AnapiDictionaryService,
    ) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

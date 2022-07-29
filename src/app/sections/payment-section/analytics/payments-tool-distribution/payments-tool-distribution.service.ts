import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AnalyticsService, AnapiDictionaryService } from '@dsh/api/anapi';
import { DictionaryService } from '@dsh/api/utils';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';
import { paymentsToolDistributionToChartData } from './payments-tool-distribution-to-chart-data';

@Injectable()
export class PaymentsToolDistributionService {
    toolDistribution$ = this.dictionaryService.init$.pipe(
        switchMap(() => this.searchParams$),
        distinctUntilChangedDeep(),
        map(searchParamsToDistributionSearchParams),
        switchMap(({ fromTime, toTime, shopIDs, realm }) =>
            this.analyticsService
                .getPaymentsToolDistribution({ fromTime, toTime, paymentInstitutionRealm: realm, shopIDs })
                .pipe(errorTo(this.errorSub$), progressTo(this.progress$))
        ),
        map(({ result }) =>
            paymentsToolDistributionToChartData(result, this.analyticsDictionaryService.getPaymentToolLabels())
        ),
        shareReplayRefCount()
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.toolDistribution$);
    error$ = attach(() => this.errorSub$, this.toolDistribution$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(
        private analyticsService: AnalyticsService,
        private analyticsDictionaryService: AnapiDictionaryService,
        private dictionaryService: DictionaryService
    ) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

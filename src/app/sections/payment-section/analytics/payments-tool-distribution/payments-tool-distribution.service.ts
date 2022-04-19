import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject, defer } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';
import { paymentsToolDistributionToChartData } from './payments-tool-distribution-to-chart-data';

@Injectable()
export class PaymentsToolDistributionService {
    toolDistribution$ = defer(() => this.searchParams$).pipe(
        distinctUntilChangedDeep(),
        map(searchParamsToDistributionSearchParams),
        switchMap(({ fromTime, toTime, shopIDs, realm }) =>
            this.analyticsService
                .getPaymentsToolDistribution({ fromTime, toTime, paymentInstitutionRealm: realm, shopIDs })
                .pipe(errorTo(this.errorSub$), progressTo(this.progress$))
        ),
        pluck('result'),
        map(paymentsToolDistributionToChartData),
        shareReplayRefCount()
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.toolDistribution$);
    error$ = attach(() => this.errorSub$, this.toolDistribution$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

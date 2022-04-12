import { Injectable } from '@angular/core';
import { forkJoin, ReplaySubject, BehaviorSubject, defer } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { progressTo, errorTo, attach, inProgressFrom, distinctUntilChangedDeep } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToStatSearchParams } from '../utils';
import { countResultToStatData } from './count-result-to-stat-data';

@Injectable()
export class PaymentsCountService {
    paymentsCount$ = defer(() => this.searchParams$).pipe(
        distinctUntilChangedDeep(),
        map(searchParamsToStatSearchParams),
        switchMap(({ current, previous, realm }) =>
            forkJoin([
                this.analyticsService.getPaymentsCount({
                    ...current,
                    paymentInstitutionRealm: realm,
                }),
                this.analyticsService.getPaymentsCount({
                    ...previous,
                    paymentInstitutionRealm: realm,
                }),
            ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$))
        ),
        map((res) => res.map((r) => r.result)),
        map(countResultToStatData),
        withLatestFrom(defer(() => this.searchParams$)),
        map(([result, { currency }]) => result.find((r) => r.currency === currency)),
        shareReplayRefCount()
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.paymentsCount$);
    error$ = attach(() => this.errorSub$, this.paymentsCount$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

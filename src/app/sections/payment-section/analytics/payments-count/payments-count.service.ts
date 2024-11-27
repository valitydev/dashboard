import { Injectable } from '@angular/core';
import { forkJoin, ReplaySubject, BehaviorSubject, defer, combineLatest } from 'rxjs';
import { map, switchMap, distinctUntilChanged, shareReplay } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/app/api/anapi';
import { progressTo, errorTo, attach, inProgressFrom, distinctUntilChangedDeep } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToStatSearchParams } from '../utils';

import { countResultToStatData } from './count-result-to-stat-data';

@Injectable()
export class PaymentsCountService {
    paymentsCount$ = combineLatest([
        defer(() => this.searchParams$).pipe(
            map(searchParamsToStatSearchParams),
            distinctUntilChangedDeep(),
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
                ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$)),
            ),
            map((res) => res.map((r) => r.result)),
            map(countResultToStatData),
        ),
        defer(() => this.searchParams$).pipe(
            map(({ currency }) => currency),
            distinctUntilChanged(),
        ),
    ]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency)),
        shareReplay({ refCount: true, bufferSize: 1 }),
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

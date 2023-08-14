import { Injectable } from '@angular/core';
import { forkJoin, defer, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/app/api/anapi';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { distinctUntilChangedDeep, inProgressFrom, attach, errorTo, progressTo } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class AveragePaymentService {
    averagePayment$ = combineLatest([
        defer(() => this.searchParams$).pipe(
            map(searchParamsToStatSearchParams),
            distinctUntilChangedDeep(),
            switchMap(({ current, previous, realm }) =>
                forkJoin([
                    this.analyticsService.getAveragePayment({
                        fromTime: current.fromTime,
                        toTime: current.toTime,
                        shopIDs: current.shopIDs,
                        paymentInstitutionRealm: realm,
                    }),
                    this.analyticsService.getAveragePayment({
                        fromTime: previous.fromTime,
                        toTime: previous.toTime,
                        shopIDs: previous.shopIDs,
                        paymentInstitutionRealm: realm,
                    }),
                ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$)),
            ),
            map((res) => res.map((r) => r.result)),
            map(amountResultToStatData),
        ),
        defer(() => this.searchParams$).pipe(
            map(({ currency }) => currency),
            distinctUntilChanged(),
        ),
    ]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency)),
        shareReplayRefCount(),
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.averagePayment$);
    error$ = attach(() => this.errorSub$, this.averagePayment$);

    private searchParams$ = new ReplaySubject<SearchParams>();
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

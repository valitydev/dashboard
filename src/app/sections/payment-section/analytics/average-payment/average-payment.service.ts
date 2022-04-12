import { Injectable } from '@angular/core';
import { forkJoin, Subject, defer, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { distinctUntilChangedDeep, inProgressFrom, attach, errorTo, progressTo } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class AveragePaymentService {
    averagePayment$ = defer(() => this.searchParams$).pipe(
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
            ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$))
        ),
        map((res) => res.map((r) => r.result)),
        map(amountResultToStatData),
        withLatestFrom(defer(() => this.searchParams$)),
        map(([result, { currency }]) => result.find((r) => r.currency === currency)),
        shareReplayRefCount()
    );

    isLoading$ = inProgressFrom(() => this.progress$, this.averagePayment$);
    error$ = attach(() => this.errorSub$, this.averagePayment$);

    private searchParams$ = new Subject<SearchParams>();
    private errorSub$ = new ReplaySubject<unknown>();
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

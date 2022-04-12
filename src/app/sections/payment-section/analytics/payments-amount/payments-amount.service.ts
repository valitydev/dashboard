import { Injectable } from '@angular/core';
import { forkJoin, BehaviorSubject, defer, ReplaySubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, inProgressFrom, attach, distinctUntilChangedDeep } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class PaymentsAmountService {
    paymentsAmount$ = defer(() => this.searchParams$).pipe(
        map(searchParamsToStatSearchParams),
        distinctUntilChangedDeep(),
        switchMap(({ current, previous, realm }) =>
            forkJoin([
                this.analyticsService.getPaymentsAmount({
                    ...current,
                    paymentInstitutionRealm: realm,
                }),
                this.analyticsService.getPaymentsAmount({
                    ...previous,
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
    isLoading$ = inProgressFrom(() => this.progress$, this.paymentsAmount$);
    error$ = attach(() => this.errorSub$, this.paymentsAmount$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>();
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams): void {
        this.searchParams$.next(searchParams);
    }
}

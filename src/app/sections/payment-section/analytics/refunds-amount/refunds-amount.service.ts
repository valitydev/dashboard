import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, combineLatest, defer, forkJoin } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/app/api/anapi';
import { attach, distinctUntilChangedDeep, errorTo, inProgressFrom, progressTo } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class RefundsAmountService {
    refundsAmount$ = combineLatest([
        defer(() => this.searchParams$).pipe(
            map(searchParamsToStatSearchParams),
            distinctUntilChangedDeep(),
            switchMap(({ current, previous, realm }) =>
                forkJoin([
                    this.analyticsService.getRefundsAmount({
                        ...current,
                        paymentInstitutionRealm: realm,
                    }),
                    this.analyticsService.getRefundsAmount({
                        ...previous,
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
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.refundsAmount$);
    error$ = attach(() => this.errorSub$, this.refundsAmount$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams): void {
        this.searchParams$.next(searchParams);
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, combineLatest, defer, forkJoin, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/app/api/anapi';
import { attach, distinctUntilChangedDeep, errorTo, inProgressFrom, progressTo } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';

import { prepareSplitAmount } from './prepare-split-amount';
import { splitAmountToChartData } from './split-amount-to-chart-data';

@Injectable()
export class PaymentSplitAmountService {
    splitAmount$ = combineLatest([
        defer(() => this.searchParams$).pipe(
            map(searchParamsToParamsWithSplitUnit),
            distinctUntilChangedDeep(),
            switchMap(({ fromTime, toTime, splitUnit, shopIDs, realm }) =>
                forkJoin([
                    of(fromTime),
                    of(toTime),
                    this.analyticsService.getPaymentsSplitAmount({
                        fromTime,
                        toTime,
                        splitUnit,
                        paymentInstitutionRealm: realm,
                        shopIDs,
                    }),
                ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$)),
            ),
            map(([fromTime, toTime, splitAmount]) =>
                prepareSplitAmount(splitAmount?.result, fromTime, toTime),
            ),
            map(splitAmountToChartData),
        ),
        defer(() => this.searchParams$).pipe(
            map(({ currency }) => currency),
            distinctUntilChanged(),
        ),
    ]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency)),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.splitAmount$);
    error$ = attach(() => this.errorSub$, this.splitAmount$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

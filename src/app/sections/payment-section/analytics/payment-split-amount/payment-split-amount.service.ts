import { Injectable } from '@angular/core';
import { forkJoin, of, defer, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/app/api/anapi';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { errorTo, progressTo, attach, inProgressFrom, distinctUntilChangedDeep } from '@dsh/utils';

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
        shareReplayRefCount(),
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

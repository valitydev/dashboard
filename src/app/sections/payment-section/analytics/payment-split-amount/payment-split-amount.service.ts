import { Injectable } from '@angular/core';
import { forkJoin, of, Subject, defer, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, attach, inProgressFrom, distinctUntilChangedDeep } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
import { prepareSplitAmount } from './prepare-split-amount';
import { splitAmountToChartData } from './split-amount-to-chart-data';

@Injectable()
export class PaymentSplitAmountService {
    splitAmount$ = defer(() => this.searchParams$).pipe(
        distinctUntilChangedDeep(),
        map(searchParamsToParamsWithSplitUnit),
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
            ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$))
        ),
        map(([fromTime, toTime, splitAmount]) => prepareSplitAmount(splitAmount?.result, fromTime, toTime)),
        map(splitAmountToChartData),
        withLatestFrom(defer(() => this.searchParams$)),
        map(([result, { currency }]) => result.find((r) => r.currency === currency)),
        shareReplayRefCount()
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.splitAmount$);
    error$ = attach(() => this.errorSub$, this.splitAmount$);

    private searchParams$ = new Subject<SearchParams>();
    private errorSub$ = new ReplaySubject<unknown>();
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}

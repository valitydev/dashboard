import { Injectable } from '@angular/core';
import { forkJoin, of, defer, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
import { prepareSplitCount } from './prepare-split-count';
import { splitCountToChartData } from './split-count-to-chart-data';

@Injectable()
export class PaymentSplitCountService {
    splitCount$ = defer(() => this.searchParams$).pipe(
        distinctUntilChangedDeep(),
        map(searchParamsToParamsWithSplitUnit),
        switchMap(({ fromTime, toTime, splitUnit, shopIDs, realm }) =>
            forkJoin([
                of(fromTime),
                of(toTime),
                this.analyticsService.getPaymentsSplitCount({
                    fromTime,
                    toTime,
                    splitUnit,
                    paymentInstitutionRealm: realm,
                    shopIDs,
                }),
            ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$))
        ),
        map(([fromTime, toTime, splitCount]) => prepareSplitCount(splitCount?.result, fromTime, toTime)),
        map(splitCountToChartData),
        withLatestFrom(defer(() => this.searchParams$)),
        map(([result, { currency }]) => result.find((r) => r.currency === currency)),
        shareReplayRefCount()
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.splitCount$);
    error$ = attach(() => this.errorSub$, this.splitCount$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService) {}

    updateSearchParams(searchParams: SearchParams): void {
        this.searchParams$.next(searchParams);
    }
}

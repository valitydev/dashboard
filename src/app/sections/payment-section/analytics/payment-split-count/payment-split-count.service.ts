import { Injectable } from '@angular/core';
import { forkJoin, of, defer, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';

import { AnalyticsService, AnapiDictionaryService } from '@dsh/app/api/anapi';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';

import { prepareSplitCount } from './prepare-split-count';
import { splitCountToChartData } from './split-count-to-chart-data';

@Injectable()
export class PaymentSplitCountService {
    splitCount$ = combineLatest([
        defer(() => this.searchParams$).pipe(
            map(searchParamsToParamsWithSplitUnit),
            distinctUntilChangedDeep(),
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
                ]).pipe(errorTo(this.errorSub$), progressTo(this.progress$)),
            ),
            map(([fromTime, toTime, splitCount]) =>
                prepareSplitCount(splitCount?.result, fromTime, toTime),
            ),
            withLatestFrom(this.anapiDictionaryService.paymentStatus$),
            map(([res, paymentStatusDict]) => splitCountToChartData(res, paymentStatusDict)),
        ),
        defer(() => this.searchParams$).pipe(
            map(({ currency }) => currency),
            distinctUntilChanged(),
        ),
    ]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency)),
        shareReplayRefCount(),
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.splitCount$);
    error$ = attach(() => this.errorSub$, this.splitCount$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(
        private analyticsService: AnalyticsService,
        private anapiDictionaryService: AnapiDictionaryService,
    ) {}

    updateSearchParams(searchParams: SearchParams): void {
        this.searchParams$.next(searchParams);
    }
}

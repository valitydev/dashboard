import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { StatusOffsetCount } from '@vality/swag-anapi-v2';
import { forkJoin, of, defer, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
import { prepareSplitCount } from './prepare-split-count';
import { splitCountToChartData } from './split-count-to-chart-data';

import StatusEnum = StatusOffsetCount.StatusEnum;

@Injectable()
export class PaymentSplitCountService {
    splitCount$ = this.transloco.selectTranslation('payment-section').pipe(
        switchMap(() => this.searchParams$),
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
        map((res) => splitCountToChartData(res, this.getPaymentStatusLabels())),
        withLatestFrom(defer(() => this.searchParams$)),
        map(([result, { currency }]) => result.find((r) => r.currency === currency)),
        shareReplayRefCount()
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.splitCount$);
    error$ = attach(() => this.errorSub$, this.splitCount$);

    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);

    constructor(private analyticsService: AnalyticsService, private transloco: TranslocoService) {}

    updateSearchParams(searchParams: SearchParams): void {
        this.searchParams$.next(searchParams);
    }

    private getPaymentStatusLabels(): Record<StatusEnum, string> {
        return {
            pending: this.transloco.translate('analytics.paymentStatuses.pending', null, 'payment-section'),
            processed: this.transloco.translate('analytics.paymentStatuses.processed', null, 'payment-section'),
            captured: this.transloco.translate('analytics.paymentStatuses.captured', null, 'payment-section'),
            cancelled: this.transloco.translate('analytics.paymentStatuses.cancelled', null, 'payment-section'),
            refunded: this.transloco.translate('analytics.paymentStatuses.refunded', null, 'payment-section'),
            failed: this.transloco.translate('analytics.paymentStatuses.failed', null, 'payment-section'),
        };
    }
}

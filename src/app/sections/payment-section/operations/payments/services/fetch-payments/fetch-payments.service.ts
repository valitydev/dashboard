import { Inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { PaymentSearchResult, SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';
import { isNumber } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { SearchService } from '@dsh/app/api/anapi';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchPaymentsService extends PartialFetcher<
    PaymentSearchResult,
    Omit<Parameters<SearchService['searchPayments']>[0], 'limit'>
> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));
    paymentsList$: Observable<PaymentSearchResult[]> = this.searchResult$;

    constructor(
        private searchService: SearchService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number,
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        { paymentAmountFrom, paymentAmountTo, ...params }: SearchPaymentsRequestParams,
        continuationToken?: string,
    ) {
        return this.searchService
            .searchPayments({
                ...params,
                paymentAmountFrom: isNumber(paymentAmountFrom) ? paymentAmountFrom : undefined,
                paymentAmountTo: isNumber(paymentAmountTo) ? paymentAmountTo : undefined,
                limit: this.searchLimit,
                continuationToken,
            })
            .pipe(
                catchError((err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate('shared.httpError', null, 'components'),
                    );
                    return of({ result: [] });
                }),
            );
    }
}

import { Inject, Injectable } from '@angular/core';
import { SearchRefundsRequestParams, RefundSearchResult } from '@vality/swag-anapi-v2';
import moment from 'moment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { SearchService } from '@dsh/api/anapi';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchRefundsService extends PartialFetcher<
    RefundSearchResult,
    Pick<SearchRefundsRequestParams, 'invoiceID' | 'paymentID'>
> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));

    constructor(
        private searchService: SearchService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        { invoiceID, paymentID }: Pick<SearchRefundsRequestParams, 'invoiceID' | 'paymentID'>,
        continuationToken: string
    ) {
        return this.searchService.searchRefunds({
            fromTime: moment().subtract(3, 'y').startOf('d').utc().format(),
            toTime: moment().endOf('d').utc().format(),
            invoiceID,
            paymentID,
            limit: this.searchLimit,
            continuationToken,
        });
    }
}

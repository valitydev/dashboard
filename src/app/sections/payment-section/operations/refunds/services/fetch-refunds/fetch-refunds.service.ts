import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { RefundSearchResult } from '@dsh/api-codegen/anapi';
import { RefundSearchService } from '@dsh/api/search';
import { PartialFetcher } from '@dsh/app/shared';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { SearchFiltersParams } from '../../refunds-search-filters';

const SEARCH_LIMIT = 10;

@Injectable()
export class FetchRefundsService extends PartialFetcher<RefundSearchResult, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private refundSearchService: RefundSearchService) {
        super();
    }

    protected fetch({ fromTime, toTime, realm, ...params }: SearchFiltersParams, continuationToken: string) {
        return this.refundSearchService.searchRefunds(
            fromTime,
            toTime,
            {
                ...params,
                paymentInstitutionRealm: realm,
            },
            SEARCH_LIMIT,
            continuationToken
        );
    }
}

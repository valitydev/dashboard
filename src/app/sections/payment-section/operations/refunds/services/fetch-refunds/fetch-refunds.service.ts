import { Injectable } from '@angular/core';
import { RefundSearchResult } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { SearchService } from '@dsh/app/api/anapi';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { PartialFetcher } from '@dsh/app/shared';

import { SearchFiltersParams } from '../../refunds-search-filters';

const SEARCH_LIMIT = 10;

@Injectable()
export class FetchRefundsService extends PartialFetcher<RefundSearchResult, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private searchService: SearchService) {
        super();
    }

    protected fetch(
        { fromTime, toTime, realm, ...params }: SearchFiltersParams,
        continuationToken: string,
    ) {
        return this.searchService.searchRefunds({
            ...params,
            fromTime,
            toTime,
            paymentInstitutionRealm: realm,
            limit: SEARCH_LIMIT,
            continuationToken,
        });
    }
}

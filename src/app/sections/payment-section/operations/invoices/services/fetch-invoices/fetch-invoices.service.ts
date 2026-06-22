import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { SearchService } from '@dsh/app/api/anapi';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { PartialFetcher } from '@dsh/app/shared';

import { Invoice } from '@vality/swag-anapi-v2';

import { SEARCH_LIMIT } from '../../../../../tokens';
import { SearchFiltersParams } from '../../invoices-search-filters';

@Injectable()
export class FetchInvoicesService extends PartialFetcher<Invoice, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    constructor(
        private searchService: SearchService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
    ) {
        super();
    }

    protected fetch(
        { fromTime, toTime, realm, ...params }: SearchFiltersParams,
        continuationToken: string,
    ) {
        return this.searchService.searchInvoices({
            ...params,
            fromTime,
            toTime,
            paymentInstitutionRealm: realm,
            limit: this.searchLimit,
            continuationToken,
        });
    }
}

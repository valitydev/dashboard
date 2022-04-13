import { Injectable } from '@angular/core';
import { Payout } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { SearchService } from '@dsh/api/anapi';
import { PartialFetcher } from '@dsh/app/shared';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { SearchParams } from './types/search-params';

@Injectable()
export class FetchPayoutsService extends PartialFetcher<Payout, SearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private searchService: SearchService) {
        super();
    }

    protected fetch({ fromTime, toTime, realm, ...restParams }: SearchParams, continuationToken: string) {
        return this.searchService.searchPayouts({
            ...restParams,
            fromTime,
            toTime,
            limit: 10,
            paymentInstitutionRealm: realm,
            continuationToken,
        });
    }
}

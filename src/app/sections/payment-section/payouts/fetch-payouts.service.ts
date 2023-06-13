import { Injectable } from '@angular/core';
import { Payout } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { SearchService } from '@dsh/app/api/anapi';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { PartialFetcher } from '@dsh/app/shared';

import { SearchParams } from './types/search-params';

@Injectable()
export class FetchPayoutsService extends PartialFetcher<Payout, SearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
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

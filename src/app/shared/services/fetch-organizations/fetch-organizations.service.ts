import { Inject, Injectable } from '@angular/core';
import { Organization } from '@vality/swag-organizations';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { OrgsService } from '@dsh/app/api/organizations';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, FetchResult, PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, void> {
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private organizationsService: OrgsService,
        @Inject(SEARCH_LIMIT) private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME) debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        return this.organizationsService.listOrgMembership({ limit: this.searchLimit, continuationToken });
    }
}

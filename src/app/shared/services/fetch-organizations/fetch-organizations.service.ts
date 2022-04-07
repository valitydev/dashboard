import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Organization } from '@dsh/api-codegen/organizations';
import { OrganizationsService } from '@dsh/api/organizations';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, FetchResult, PartialFetcher } from '@dsh/app/shared';
import { mapToTimestamp } from '@dsh/operators';

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, void> {
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private organizationsService: OrganizationsService,
        @Inject(SEARCH_LIMIT) private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME) debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        return this.organizationsService.listOrgMembership(this.searchLimit, continuationToken);
    }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Claim } from '@vality/swag-claim-management';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import { FetchResult, PartialFetcher } from '@dsh/app/shared';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { ClaimsSearchFiltersSearchParams } from '../../claims-search-filters/claims-search-filters-search-params';

@Injectable()
export class FetchClaimsService extends PartialFetcher<Claim, ClaimsSearchFiltersSearchParams> {
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));

    private readonly searchLimit = 20;

    constructor(
        private claimsService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
        this.errors$.subscribe(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        });
    }

    protected fetch(
        params: ClaimsSearchFiltersSearchParams,
        continuationToken: string
    ): Observable<FetchResult<Claim>> {
        return this.claimsService.searchClaims({
            limit: this.searchLimit,
            claimStatuses: params.claimStatuses,
            claimID: params.claimID,
            continuationToken,
        });
    }
}

import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Claim } from '@vality/swag-claim-management';
import { Observable } from 'rxjs';

import { ClaimsService } from '@dsh/app/api/claim-management';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { FetchResult, PartialFetcher } from '@dsh/app/shared';

import { ClaimsSearchFiltersSearchParams } from '../../claims-search-filters/claims-search-filters-search-params';

@Injectable()
export class FetchClaimsService extends PartialFetcher<Claim, ClaimsSearchFiltersSearchParams> {
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    private readonly searchLimit = 20;

    constructor(
        private claimsService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
        this.errors$.subscribe(() => {
            this.snackBar.open(this.transloco.translate('shared.httpError', null, 'components'), 'OK');
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

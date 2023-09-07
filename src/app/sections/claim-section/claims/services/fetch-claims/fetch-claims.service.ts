import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Claim } from '@vality/swag-claim-management';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

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
        private transloco: TranslocoService,
    ) {
        super();
        this.errors$
            .pipe(
                withLatestFrom(
                    this.transloco.selectTranslate('shared.httpError', null, 'components'),
                ),
            )
            .subscribe(([, message]) => {
                this.snackBar.open(message, 'OK');
                return [];
            });
    }

    protected fetch(
        params: ClaimsSearchFiltersSearchParams,
        continuationToken: string,
    ): Observable<FetchResult<Claim>> {
        return this.claimsService.searchClaims({
            limit: this.searchLimit,
            claimStatuses: params.claimStatuses,
            claimID: params.claimID,
            continuationToken,
        });
    }
}

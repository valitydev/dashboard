import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { InlineResponse20011, SearchService } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';
import { IdGeneratorService } from '@dsh/app/shared/services/id-generator';

import { toDateLike } from '../utils';
import { PayoutsSearchParams } from './model';

type PayoutsAndContinuationToken = InlineResponse20011;

@Injectable()
export class PayoutSearchService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private searchService: SearchService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    searchPayouts(
        fromTime: string,
        toTime: string,
        limit: number,
        options: PayoutsSearchParams
    ): Observable<PayoutsAndContinuationToken> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.searchService.searchPayouts(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    limit,
                    undefined,
                    options.shopID,
                    options.shopIDs,
                    options.paymentInstitutionRealm,
                    options.offset,
                    options.payoutID,
                    options.payoutToolType,
                    options.excludedShops,
                    options.continuationToken
                )
            )
        );
    }
}

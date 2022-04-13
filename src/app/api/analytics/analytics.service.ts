import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AnalyticsService as APIAnalyticsService, InlineResponse200 } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';
import { IdGeneratorService } from '@dsh/app/shared/services/id-generator';

@Injectable()
export class AnalyticsService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private analyticsService: APIAnalyticsService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    getGroupBalances(params: { shopIDs?: string[]; excludeShopIDs?: string[] }): Observable<InlineResponse200> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getCurrentBalancesGroupByShop(
                    this.idGenerator.shortUuid(),
                    partyID,
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs
                )
            )
        );
    }
}

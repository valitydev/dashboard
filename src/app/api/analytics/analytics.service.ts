import { Injectable } from '@angular/core';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AnalyticsService as APIAnalyticsService, InlineResponse200, InlineResponse2001 } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';
import { IdGeneratorService } from '@dsh/app/shared/services/id-generator';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class AnalyticsService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private analyticsService: APIAnalyticsService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    getCurrentBalances(params: {
        shopIDs?: string[];
        excludeShopIDs?: string[];
        paymentInstitutionRealm?: RealmEnum;
    }): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getCurrentBalances(
                    this.idGenerator.shortUuid(),
                    partyID,
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

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

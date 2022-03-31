import { Injectable } from '@angular/core';
import { AnalyticsService as AnapiAnalyticsService } from '@vality/swag-anapi-v2';
import { switchMap } from 'rxjs';
import { first } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { IdGeneratorService, KeycloakTokenInfoService } from '@dsh/app/shared';

type ApiMethodParams<M extends (params: object) => unknown, P extends keyof Parameters<M>[0] = never> = Overwrite<
    Parameters<M>[0],
    { [N in P]?: Parameters<M>[0][N] }
>;

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    constructor(
        private analyticsService: AnapiAnalyticsService,
        private idGenerator: IdGeneratorService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    getPaymentsAmount(params: ApiMethodParams<AnapiAnalyticsService['getPaymentsAmount'], 'xRequestID' | 'partyID'>) {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.analyticsService.getPaymentsAmount({
                    xRequestID: this.idGenerator.shortUuid(),
                    partyID,
                    ...params,
                })
            )
        );
    }
}

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnalyticsService as ApiAnalyticsService } from '@vality/swag-anapi-v2';
import { switchMap } from 'rxjs';
import { first } from 'rxjs/operators';

import { IdGeneratorService, KeycloakTokenInfoService } from '@dsh/app/shared';

import { ApiMethodParams } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    constructor(
        private analyticsService: ApiAnalyticsService,
        private idGenerator: IdGeneratorService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {
        this.analyticsService.defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }

    getPaymentsAmount(params: ApiMethodParams<ApiAnalyticsService['getPaymentsAmount'], 'xRequestID' | 'partyID'>) {
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
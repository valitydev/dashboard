import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SearchService } from '@dsh/api-codegen/anapi';
import { IdGeneratorService } from '@dsh/app/shared';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { toDateLike } from '../utils';
import { Duration, RefundsSearchParams } from './model';

@Injectable()
export class RefundSearchService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private searchService: SearchService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    searchRefunds(
        fromTime: string,
        toTime: string,
        params: RefundsSearchParams,
        limit: number,
        continuationToken?: string
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.searchService.searchRefunds(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    limit,
                    undefined,
                    params.shopID,
                    params.shopIDs,
                    params.paymentInstitutionRealm,
                    undefined,
                    params.invoiceIDs,
                    params.invoiceID,
                    params.paymentID,
                    params.refundID,
                    params.externalID,
                    params.refundStatus,
                    params.excludedShops,
                    continuationToken
                )
            )
        );
    }

    searchRefundsByDuration(
        { amount, unit }: Duration,
        params: RefundsSearchParams,
        limit?: number,
        continuationToken?: string
    ) {
        const from = moment().subtract(amount, unit).startOf('d').utc().format();
        const to = moment().endOf('d').utc().format();
        return this.searchRefunds(from, to, params, limit, continuationToken);
    }
}

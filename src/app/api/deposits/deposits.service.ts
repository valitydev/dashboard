import { Injectable } from '@angular/core';

import { DepositsService as ApiDepositsService } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { IdGeneratorService } from '@dsh/app/shared';

import { toDateLike } from '../utils';
import { DepositsSearchParams } from './deposits-search-params';

@Injectable()
export class DepositsService {
    constructor(private depositsService: ApiDepositsService, private idGenerator: IdGeneratorService) {}

    listDeposits(params: DepositsSearchParams, limit = 20, continuationToken?: string) {
        return this.depositsService.listDeposits(
            this.idGenerator.shortUuid(),
            limit,
            undefined,
            params.walletID,
            params.identityID,
            params.depositID,
            params.sourceID,
            params.status,
            params.fromTime ? toDateLike(params.fromTime) : undefined,
            params.toTime ? toDateLike(params.toTime) : undefined,
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }

    listDepositReverts(params: DepositsSearchParams, limit = 20, continuationToken?: string) {
        return this.depositsService.listDepositReverts(
            this.idGenerator.shortUuid(),
            limit,
            undefined,
            params.walletID,
            params.identityID,
            params.depositID,
            params.sourceID,
            params.status,
            params.fromTime ? toDateLike(params.fromTime) : undefined,
            params.toTime ? toDateLike(params.toTime) : undefined,
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }
}

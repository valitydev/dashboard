import { Inject, Injectable } from '@angular/core';
import { Deposit } from '@vality/swag-wallet';

import { DepositsService } from '@dsh/app/api/wallet';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchWalletDepositsService extends PartialFetcher<Deposit, string> {
    constructor(
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        private depositsService: DepositsService,
    ) {
        super();
    }

    protected fetch(walletID: string, continuationToken: string) {
        return this.depositsService.listDeposits({
            walletID,
            limit: this.searchLimit,
            continuationToken,
        });
    }
}

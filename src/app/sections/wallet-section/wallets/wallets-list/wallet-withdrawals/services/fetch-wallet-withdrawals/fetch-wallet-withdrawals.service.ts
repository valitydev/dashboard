import { Inject, Injectable } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallets';
import { Observable } from 'rxjs';

import { WithdrawalsService } from '@dsh/app/api/wallet';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchWalletWithdrawalsService extends PartialFetcher<Withdrawal, string> {
    constructor(
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        private withdrawalsService: WithdrawalsService,
    ) {
        super();
    }

    protected fetch(walletID: string, continuationToken: string): Observable<unknown> {
        return this.withdrawalsService.listWithdrawals({
            walletID,
            limit: this.searchLimit,
            continuationToken,
        });
    }
}

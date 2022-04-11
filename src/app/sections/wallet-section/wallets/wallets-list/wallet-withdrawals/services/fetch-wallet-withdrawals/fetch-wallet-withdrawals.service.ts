import { Inject, Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Withdrawal } from '@vality/swag-wallet';
import { Observable } from 'rxjs';

import { WithdrawalsService } from '@dsh/api/wallet';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { PartialFetcher } from '@dsh/app/shared';

@UntilDestroy()
@Injectable()
export class FetchWalletWithdrawalsService extends PartialFetcher<Withdrawal, string> {
    constructor(
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        private withdrawalsService: WithdrawalsService
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

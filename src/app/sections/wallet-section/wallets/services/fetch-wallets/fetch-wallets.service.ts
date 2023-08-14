import { Inject, Injectable } from '@angular/core';
import { Wallet } from '@vality/swag-wallet';
import { ListWalletsRequestParams } from '@vality/swag-wallet/lib/api/wallets.service';
import { Observable } from 'rxjs';

import { WalletsService } from '@dsh/app/api/wallet';
import { mapToTimestamp, shareReplayRefCount } from '@dsh/app/custom-operators';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { FetchResult, PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchWalletsService extends PartialFetcher<
    Wallet,
    Pick<ListWalletsRequestParams, 'identityID' | 'currencyID'>
> {
    lastUpdated$: Observable<string> = this.searchResult$.pipe(
        mapToTimestamp,
        shareReplayRefCount(),
    );

    constructor(
        @Inject(SEARCH_LIMIT) private searchLimit: number,
        private walletService: WalletsService,
    ) {
        super();
    }

    protected fetch(
        params: Pick<ListWalletsRequestParams, 'identityID' | 'currencyID'>,
        continuationToken: string,
    ): Observable<FetchResult<Wallet>> {
        return this.walletService.listWallets({
            limit: this.searchLimit,
            ...params,
            continuationToken,
        });
    }
}

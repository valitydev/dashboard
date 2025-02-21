import { DestroyRef, Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Wallet } from '@vality/swag-wallet';
import { ListWalletsRequestParams } from '@vality/swag-wallet/lib/api/wallets.service';
import { Observable, shareReplay } from 'rxjs';

import { WalletsService } from '@dsh/app/api/wallet';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ContextOrganizationService, FetchResult, PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchWalletsService extends PartialFetcher<
    Wallet,
    Pick<ListWalletsRequestParams, 'identityID' | 'currencyID'>
> {
    lastUpdated$: Observable<string> = this.searchResult$.pipe(
        mapToTimestamp,
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        @Inject(SEARCH_LIMIT) private searchLimit: number,
        private walletService: WalletsService,
        private contextOrganizationService: ContextOrganizationService,
        destroyRef: DestroyRef,
    ) {
        super();
        this.contextOrganizationService.organization$
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe(() => {
                this.refresh();
            });
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

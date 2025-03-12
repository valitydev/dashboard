import { Inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';
import { DepositRevert, ListDepositRevertsRequestParams } from '@vality/swag-wallets';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { DepositsService } from '@dsh/app/api/wallet';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchDepositRevertsService extends PartialFetcher<
    DepositRevert,
    Omit<ListDepositRevertsRequestParams, 'xRequestID' | 'limit'>
> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));

    constructor(
        private depositsService: DepositsService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number,
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        params: Omit<ListDepositRevertsRequestParams, 'xRequestID' | 'limit'>,
        continuationToken: string,
    ) {
        return this.depositsService
            .listDepositReverts({ ...params, limit: this.searchLimit, continuationToken })
            .pipe(
                catchError((err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate('shared.httpError', null, 'components'),
                    );
                    return of({ result: [] });
                }),
            );
    }
}

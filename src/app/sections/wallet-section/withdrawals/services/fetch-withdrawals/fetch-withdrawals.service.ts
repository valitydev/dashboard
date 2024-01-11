import { Inject, Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { Withdrawal, ListWithdrawals200Response } from '@vality/swag-wallet';
import { ListWithdrawalsRequestParams } from '@vality/swag-wallet/lib/api/withdrawals.service';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { WithdrawalsService } from '@dsh/app/api/wallet';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@dsh/app/shared';

@Injectable()
export class FetchWithdrawalsService extends PartialFetcher<
    Withdrawal,
    Omit<ListWithdrawalsRequestParams, 'xRequestID' | 'limit'>
> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private withdrawalsService: WithdrawalsService,
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
        params: Omit<ListWithdrawalsRequestParams, 'xRequestID' | 'limit'>,
        continuationToken?: string,
    ): Observable<ListWithdrawals200Response> {
        return this.withdrawalsService
            .listWithdrawals({ ...params, limit: this.searchLimit, continuationToken })
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

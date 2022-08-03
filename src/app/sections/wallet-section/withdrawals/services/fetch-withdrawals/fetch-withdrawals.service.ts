import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { InlineResponse2007, Withdrawal } from '@vality/swag-wallet';
import { ListWithdrawalsRequestParams } from '@vality/swag-wallet/lib/api/withdrawals.service';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { WithdrawalsService } from '@dsh/api/wallet';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@dsh/app/shared';
import { mapToTimestamp } from '@dsh/operators';

type WithdrawalsAndContinuationToken = InlineResponse2007;

@Injectable()
export class FetchWithdrawalsService extends PartialFetcher<
    Withdrawal,
    Omit<ListWithdrawalsRequestParams, 'xRequestID' | 'limit'>
> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private withdrawalsService: WithdrawalsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        params: Omit<ListWithdrawalsRequestParams, 'xRequestID' | 'limit'>,
        continuationToken?: string
    ): Observable<WithdrawalsAndContinuationToken> {
        return this.withdrawalsService.listWithdrawals({ ...params, limit: this.searchLimit, continuationToken }).pipe(
            catchError(() => {
                this.snackBar.open(this.transloco.translate('shared.httpError', null, 'components'), 'OK');
                return of({ result: [] });
            })
        );
    }
}

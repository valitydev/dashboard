import { Inject, Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { DepositRevert } from '@vality/swag-wallet';
import { ListDepositRevertsRequestParams } from '@vality/swag-wallet/lib/api/deposits.service';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { DepositsService } from '@dsh/api/wallet';
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
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(params: Omit<ListDepositRevertsRequestParams, 'xRequestID' | 'limit'>, continuationToken: string) {
        return this.depositsService.listDepositReverts({ ...params, limit: this.searchLimit, continuationToken }).pipe(
            catchError(() => {
                this.snackBar.open(this.transloco.translate('shared.httpError', null, 'components'), 'OK');
                return of({ result: [] });
            })
        );
    }
}

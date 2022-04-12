import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { WalletAccount } from '@vality/swag-wallet';
import { BehaviorSubject, defer, EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { WalletsService } from '@dsh/api/wallet';
import { ErrorService } from '@dsh/app/shared';
import { shareReplayUntilDestroyed } from '@dsh/operators';
import { errorTo, progressTo } from '@dsh/utils';

@UntilDestroy()
@Injectable()
export class FetchWalletAccountService {
    walletAccount$: Observable<WalletAccount> = defer(() => this.fetchWalletAccount$).pipe(
        switchMap((walletID) =>
            this.walletService.getWalletAccount({ walletID }).pipe(
                progressTo(this.progress$),
                errorTo(this.error$),
                catchError((err) => {
                    this.errorService.error(err, false);
                    return EMPTY;
                })
            )
        ),
        shareReplayUntilDestroyed(this)
    );

    isLoading$: Observable<boolean> = defer(() => this.progress$).pipe(map(Boolean));

    error$ = new BehaviorSubject<unknown>(null);

    private progress$ = new BehaviorSubject<number>(0);

    private fetchWalletAccount$ = new ReplaySubject<string>();

    constructor(private walletService: WalletsService, private errorService: ErrorService) {}

    fetchWalletAccount(walletID: string): void {
        this.fetchWalletAccount$.next(walletID);
    }
}

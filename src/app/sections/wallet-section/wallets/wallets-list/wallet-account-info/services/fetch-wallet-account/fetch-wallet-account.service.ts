import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WalletAccount } from '@vality/swag-wallet';
import { BehaviorSubject, defer, EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { WalletsService } from '@dsh/app/api/wallet';
import { errorTo, progressTo } from '@dsh/utils';

@Injectable()
export class FetchWalletAccountService {
    walletAccount$: Observable<WalletAccount> = defer(() => this.fetchWalletAccount$).pipe(
        switchMap((walletID) =>
            this.walletService.getWalletAccount({ walletID }).pipe(
                progressTo(this.progress$),
                errorTo(this.error$, true),
                catchError((err) => {
                    console.error(err);
                    return EMPTY;
                }),
            ),
        ),
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );

    isLoading$: Observable<boolean> = defer(() => this.progress$).pipe(map(Boolean));

    error$ = new BehaviorSubject<unknown>(null);

    private progress$ = new BehaviorSubject<number>(0);

    private fetchWalletAccount$ = new ReplaySubject<string>();

    constructor(
        private walletService: WalletsService,
        private dr: DestroyRef,
    ) {}

    fetchWalletAccount(walletID: string): void {
        this.fetchWalletAccount$.next(walletID);
    }
}

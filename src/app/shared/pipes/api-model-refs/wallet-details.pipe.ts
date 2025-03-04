import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, pluck, takeUntil } from 'rxjs/operators';

import { WalletsService } from '@dsh/app/api/wallet';

@Pipe({
    name: 'walletDetails',
    pure: false,
    standalone: false,
})
export class WalletDetailsPipe implements PipeTransform, OnDestroy {
    private walletName$: BehaviorSubject<string> = new BehaviorSubject('');
    private walletIDChange$: Subject<string> = new Subject();
    private destroy$: Subject<void> = new Subject();

    constructor(
        private walletService: WalletsService,
        private ref: ChangeDetectorRef,
    ) {
        combineLatest([
            this.walletService.wallets$,
            this.walletIDChange$.pipe(distinctUntilChanged()),
        ])
            .pipe(
                takeUntil(this.destroy$),
                map(([wallets, walletID]) => wallets.find((s) => s.id === walletID)),
                pluck('name'),
            )
            .subscribe((v) => {
                this.walletName$.next(v);
                this.ref.markForCheck();
            });
    }

    transform(walletID: string): string {
        this.walletIDChange$.next(walletID);
        return this.walletName$.value;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}

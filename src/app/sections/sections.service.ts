import { Injectable, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { combineLatest, switchMap, EMPTY, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { WalletsService } from '@dsh/app/api/wallet';
import { ShopsDataService } from '@dsh/app/shared';

export enum AppSection {
    Payment,
    Wallet,
}

const SECTION_URL_MAP = {
    [AppSection.Payment]: 'payment-section',
    [AppSection.Wallet]: 'wallet-section',
};

@Injectable({
    providedIn: 'root',
})
export class SectionsService {
    allowedMap$ = combineLatest([
        this.shopsDataService.shopsAllowed$,
        this.walletsService.wallets$.pipe(map((w) => !!w?.length)),
    ]).pipe(
        map(([shopsAllowed, walletsAllowed]) => ({
            [AppSection.Payment]: shopsAllowed || (!shopsAllowed && !walletsAllowed),
            [AppSection.Wallet]: walletsAllowed,
        })),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        private shopsDataService: ShopsDataService,
        private walletsService: WalletsService,
        router: Router,
        destroyRef: DestroyRef,
    ) {
        this.allowedMap$
            .pipe(
                takeUntilDestroyed(destroyRef),
                switchMap((allowedMap) => {
                    const activeSection: AppSection = Object.entries(SECTION_URL_MAP).find(
                        ([, url]) => router.url.startsWith(`/${url}`),
                    )?.[0] as never;
                    if (!activeSection || allowedMap[activeSection]) {
                        return EMPTY;
                    }
                    return of(
                        Object.entries(allowedMap).find(
                            ([, allowed]) => allowed,
                        )[0] as never as AppSection,
                    );
                }),
            )
            .subscribe((activeSection) => {
                void router.navigate([SECTION_URL_MAP[activeSection]]);
            });
    }
}

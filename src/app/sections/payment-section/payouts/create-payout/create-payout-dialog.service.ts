import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, merge, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { PayoutsService } from '@dsh/app/api/payments';
import { ShopsDataService } from '@dsh/app/shared';

import { toPayoutParams } from './to-payout-params';

@Injectable()
export class CreatePayoutDialogService {
    private currentShopID$ = new Subject<string>();

    private create$ = new Subject<{ shopID: string; payoutToolID: string; amount: number }>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<void>();
    private created$ = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.loading$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorOccurred$ = this.error$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    payoutCreated$ = this.created$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    payoutTools$ = this.currentShopID$.pipe(
        switchMap((shopID) => this.shopsDataService.shops$.pipe(map((shops) => shops.find(({ id }) => id === shopID)))),
        switchMap(({ contractID }) => this.payoutsService.getPayoutToolsForParty({ contractID })),
        map((tools) => tools.filter((tool) => tool.details.detailsType === 'PayoutToolDetailsWalletInfo')),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    hasPayoutTools$ = this.payoutTools$.pipe(
        map((tools) => !!tools.length),
        shareReplay(1)
    );

    constructor(private shopsDataService: ShopsDataService, private payoutsService: PayoutsService) {
        merge(this.payoutTools$, this.hasPayoutTools$).subscribe();
        this.create$
            .pipe(
                tap(() => {
                    this.loading$.next(true);
                    this.created$.next(false);
                }),
                switchMap((params) =>
                    forkJoin([
                        of(params),
                        this.shopsDataService.shops$.pipe(
                            take(1),
                            map((shops) => shops.find(({ id }) => id === params.shopID)?.currency)
                        ),
                    ])
                ),
                map(([params, currency]) => toPayoutParams(params, currency)),
                switchMap((payoutParams) =>
                    this.payoutsService.createPayout({ payoutParams }).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => {
                this.loading$.next(false);
                this.created$.next(true);
            });
    }

    changeShopID(id: string) {
        this.currentShopID$.next(id);
    }

    createPayout(formValue: { shopID: string; payoutToolID: string; amount: number }) {
        this.create$.next(formValue);
    }
}

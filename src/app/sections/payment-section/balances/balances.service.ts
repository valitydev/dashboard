import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { catchError, pluck, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/app/api/anapi';
import { shareReplayRefCount } from '@dsh/app/custom-operators';

import { PaymentInstitutionRealmService } from '../services';

@Injectable()
export class BalancesService {
    balances$ = timer(1, 10000).pipe(
        switchMap(() => this.realmService.realm$),
        switchMap((paymentInstitutionRealm) =>
            this.analyticsService.getCurrentBalances({ paymentInstitutionRealm }).pipe(
                catchError((ex) => {
                    console.error(ex);
                    return of({ result: [] });
                }),
            ),
        ),
        pluck('result'),
        shareReplayRefCount(),
    );
    balancesCount$ = this.balances$.pipe(pluck('length'));

    constructor(
        private analyticsService: AnalyticsService,
        private realmService: PaymentInstitutionRealmService,
    ) {}
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Claim } from '@vality/swag-claim-management';
import { BehaviorSubject, Subject, timer, defer } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { RouteParamClaimService } from './route-param-claim.service';

const POLLING_PERIOD = 5000;

@UntilDestroy()
@Injectable()
export class ReceiveClaimService {
    claim$ = defer(() => this.claimState$).pipe(filter(Boolean), shareReplay(1));
    error$ = defer(() => this.receiveClaimError$);
    isLoading$ = this.routeParamClaimService.isLoading$;

    private claimState$ = new BehaviorSubject<Claim>(null);
    private receiveClaimError$ = new BehaviorSubject(false);
    private receiveClaim$ = new Subject<void>();

    constructor(
        private routeParamClaimService: RouteParamClaimService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.receiveClaim$
            .pipe(
                switchMap(() => timer(0, POLLING_PERIOD)),
                switchMap(() => this.routeParamClaimService.claim$),
                untilDestroyed(this)
            )
            .subscribe(
                (claim) => this.claimState$.next(claim),
                (err) => {
                    console.error(err);
                    this.snackBar.open(this.transloco.translate('shared.commonError', null, 'components'), 'OK');
                    this.receiveClaimError$.next(true);
                }
            );
    }

    receiveClaim() {
        this.receiveClaim$.next();
    }
}

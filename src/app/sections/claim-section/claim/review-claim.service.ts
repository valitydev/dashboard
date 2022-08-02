import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claim-management';
import { NotificationService } from '@dsh/app/shared';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { UiError } from '../../ui-error';
import { ReceiveClaimService } from './receive-claim.service';
import { RouteParamClaimService } from './route-param-claim.service';

@UntilDestroy()
@Injectable()
export class ReviewClaimService {
    private reviewClaim$: Subject<void> = new Subject();
    private error$: BehaviorSubject<UiError> = new BehaviorSubject({ hasError: false });
    private progress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    reviewAvailable$: Observable<boolean> = this.receiveClaimService.claim$.pipe(
        map(({ status }) => status === 'pending'),
        shareReplay(1)
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$: Observable<boolean> = this.progress$.asObservable();

    constructor(
        private claimsApiService: ClaimsService,
        private routeParamClaimService: RouteParamClaimService,
        private receiveClaimService: ReceiveClaimService,
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private notificationService: NotificationService
    ) {
        this.reviewClaim$
            .pipe(
                tap(() => {
                    this.error$.next({ hasError: false });
                    this.progress$.next(true);
                }),
                switchMap(() =>
                    this.dialog
                        .open(ConfirmActionDialogComponent)
                        .afterClosed()
                        .pipe(
                            tap((r) => {
                                if (r === 'cancel') {
                                    this.progress$.next(false);
                                }
                            }),
                            filter((r) => r === 'confirm')
                        )
                ),
                switchMap(() => this.routeParamClaimService.claim$),
                switchMap(({ id, revision }) =>
                    this.claimsApiService
                        .requestReviewClaimByIDWithRevisionCheck({ claimID: id, claimRevision: revision })
                        .pipe(
                            catchError((ex) => {
                                this.progress$.next(false);
                                console.error(ex);
                                const error = { hasError: true, code: 'requestReviewClaimByIDFailed' };
                                this.notificationService.error(
                                    this.transloco.translate(
                                        'claim.requestReviewClaimByIDFailed',
                                        null,
                                        'claim-section'
                                    )
                                );
                                this.error$.next(error);
                                return of(error);
                            })
                        )
                ),
                untilDestroyed(this)
            )
            .subscribe(() => {
                this.receiveClaimService.receiveClaim();
                this.notificationService.success(this.transloco.translate('claim.reviewed', null, 'claim-section'));
            });
    }

    reviewClaim() {
        this.reviewClaim$.next();
    }
}

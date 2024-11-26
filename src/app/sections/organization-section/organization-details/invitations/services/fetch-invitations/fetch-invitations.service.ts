import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Invitation, InvitationStatusName } from '@vality/swag-organizations';
import { BehaviorSubject, defer, of } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { InvitationsService } from '@dsh/app/api/organizations';
import { mapToTimestamp, progress } from '@dsh/app/custom-operators';
import { ErrorService } from '@dsh/app/shared';

@Injectable()
export class FetchInvitationsService {
    invitations$ = defer(() => this.loadInvitations$).pipe(
        switchMapTo(this.route.params),
        switchMap(({ orgId }) =>
            this.invitationsService
                .listInvitations({ orgId, status: InvitationStatusName.Pending })
                .pipe(
                    pluck('result'),
                    catchError((err) => {
                        this.errorService.error(err);
                        return of([] as Invitation[]);
                    }),
                ),
        ),
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );
    lastUpdated$ = this.invitations$.pipe(
        mapToTimestamp,
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );
    isLoading$ = defer(() => progress(this.loadInvitations$, this.invitations$)).pipe(
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );

    private loadInvitations$ = new BehaviorSubject<void>(undefined);

    constructor(
        private invitationsService: InvitationsService,
        private errorService: ErrorService,
        private route: ActivatedRoute,
        private dr: DestroyRef,
    ) {}

    load() {
        this.loadInvitations$.next();
    }
}

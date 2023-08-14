import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Invitation, InvitationStatusName } from '@vality/swag-organizations';
import { BehaviorSubject, defer, of } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { InvitationsService } from '@dsh/app/api/organizations';
import { mapToTimestamp, progress } from '@dsh/app/custom-operators';
import { ErrorService } from '@dsh/app/shared';

@UntilDestroy()
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
        untilDestroyed(this),
        shareReplay(1),
    );
    lastUpdated$ = this.invitations$.pipe(mapToTimestamp, untilDestroyed(this), shareReplay(1));
    isLoading$ = defer(() => progress(this.loadInvitations$, this.invitations$)).pipe(
        untilDestroyed(this),
        shareReplay(1),
    );

    private loadInvitations$ = new BehaviorSubject<void>(undefined);

    constructor(
        private invitationsService: InvitationsService,
        private errorService: ErrorService,
        private route: ActivatedRoute,
    ) {}

    load() {
        this.loadInvitations$.next();
    }
}

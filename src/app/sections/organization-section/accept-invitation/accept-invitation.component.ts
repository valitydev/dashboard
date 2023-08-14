import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first, pluck, switchMap } from 'rxjs/operators';

import { OrgsService } from '@dsh/app/api/organizations';
import { ErrorService } from '@dsh/app/shared';
import { inProgressTo } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-accept-invitation',
    templateUrl: 'accept-invitation.component.html',
    styleUrls: ['accept-invitation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptInvitationComponent {
    hasError = false;
    isCompleted = false;
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private route: ActivatedRoute,
        private organizationsService: OrgsService,
        private errorService: ErrorService,
    ) {}

    @inProgressTo('isLoading$')
    accept(): Subscription {
        const subscription = this.route.params
            .pipe(
                first(),
                pluck('token'),
                switchMap((invitation: string) =>
                    this.organizationsService.joinOrg({ organizationJoinRequest: { invitation } }),
                ),
                untilDestroyed(this),
            )
            .subscribe({
                error: (err) => {
                    this.errorService.error(err, false);
                    this.hasError = true;
                },
            });
        subscription.add(() => (this.isCompleted = true));
        return subscription;
    }
}

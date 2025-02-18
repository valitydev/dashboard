import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first, pluck, switchMap } from 'rxjs/operators';

import { OrgsService } from '@dsh/app/api/organizations';
import { inProgressTo } from '@dsh/utils';

@Component({
    selector: 'dsh-accept-invitation',
    templateUrl: 'accept-invitation.component.html',
    styleUrls: ['accept-invitation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AcceptInvitationComponent {
    hasError = false;
    isCompleted = false;
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private route: ActivatedRoute,
        private organizationsService: OrgsService,
        private dr: DestroyRef,
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
                takeUntilDestroyed(this.dr),
            )
            .subscribe({
                error: (err) => {
                    console.error(err);
                    this.hasError = true;
                },
            });
        subscription.add(() => (this.isCompleted = true));
        return subscription;
    }
}

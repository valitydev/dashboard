import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Invitation, Organization, RevokeInvitationRequest } from '@vality/swag-organizations';
import { filter, switchMap } from 'rxjs/operators';

import { InvitationsService } from '@dsh/app/api/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { ConfirmActionDialogComponent, ConfirmActionDialogResult } from '@dsh/components/popups';
import { ignoreBeforeCompletion } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-invitation',
    templateUrl: 'invitation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationComponent {
    @Input() orgId: Organization['id'];
    @Input() invitation: Invitation;

    @Output() changed = new EventEmitter<void>();

    constructor(
        private dialog: MatDialog,
        private invitationsService: InvitationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
    ) {}

    @ignoreBeforeCompletion
    cancel() {
        return this.dialog
            .open<ConfirmActionDialogComponent, void, ConfirmActionDialogResult>(
                ConfirmActionDialogComponent,
            )
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() =>
                    this.invitationsService.revokeInvitation({
                        orgId: this.orgId,
                        invitationId: this.invitation.id,
                        revokeInvitationRequest: {
                            status: RevokeInvitationRequest.StatusEnum.Revoked,
                        },
                    }),
                ),
                untilDestroyed(this),
            )
            .subscribe(
                () => {
                    this.changed.emit();
                    this.notificationService.success();
                },
                (err) => this.errorService.error(err),
            );
    }
}

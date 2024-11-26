import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponseStatus, DialogResponse } from '@vality/ng-core';
import { Invitation, Organization, RevokeInvitationRequest } from '@vality/swag-organizations';
import { filter, switchMap } from 'rxjs/operators';

import { InvitationsService } from '@dsh/app/api/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { ignoreBeforeCompletion } from '@dsh/utils';

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
        private dr: DestroyRef,
    ) {}

    @ignoreBeforeCompletion
    cancel() {
        return this.dialog
            .open<ConfirmActionDialogComponent, void, DialogResponse>(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r.status === DialogResponseStatus.Success),
                switchMap(() =>
                    this.invitationsService.revokeInvitation({
                        orgId: this.orgId,
                        invitationId: this.invitation.id,
                        revokeInvitationRequest: {
                            status: RevokeInvitationRequest.StatusEnum.Revoked,
                        },
                    }),
                ),
                takeUntilDestroyed(this.dr),
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

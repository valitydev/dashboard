import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InviteeContact, MemberRole } from '@vality/swag-organizations';
import { BehaviorSubject } from 'rxjs';

import { InvitationsService } from '@dsh/app/api/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { inProgressTo } from '@dsh/utils';

import { CreateInvitationDialogData } from './types/create-invitation-dialog-data';

@Component({
    selector: 'dsh-create-invitation-dialog',
    templateUrl: 'create-invitation-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvitationDialogComponent {
    emailControl = this.fb.control<string>('', Validators.email);
    inProgress$ = new BehaviorSubject<boolean>(false);
    selectedRoles: MemberRole[] = [];

    constructor(
        private dialogRef: MatDialogRef<CreateInvitationDialogComponent, BaseDialogResponseStatus>,
        @Inject(MAT_DIALOG_DATA) private data: CreateInvitationDialogData,
        private invitationsService: InvitationsService,
        private errorService: ErrorService,
        private notificationService: NotificationService,
        private fb: FormBuilder,
        private dr: DestroyRef,
    ) {}

    @inProgressTo('inProgress$')
    create() {
        return this.invitationsService
            .createInvitation({
                orgId: this.data.organization.id,
                invitationRequest: {
                    invitee: {
                        contact: {
                            type: InviteeContact.TypeEnum.EMail,
                            email: this.emailControl.value,
                        },
                        roles: this.selectedRoles,
                    },
                },
            })
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                (err) => {
                    this.errorService.error(err);
                },
            );
    }

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }

    selectRoles(selectedRoles: MemberRole[]) {
        this.selectedRoles = selectedRoles;
    }
}

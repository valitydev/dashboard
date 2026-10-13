import { filter, switchMap } from 'rxjs/operators';

import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MembersService } from '@dsh/app/api/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { DialogResponseStatus, DialogService } from '@vality/matez';
import { Member, Organization } from '@vality/swag-organizations';

import { EditRolesDialogComponent } from '../edit-roles-dialog/edit-roles-dialog.component';

@Component({
    selector: 'dsh-member',
    templateUrl: 'member.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class MemberComponent {
    @Input() organization: Organization;
    @Input() member: Member;

    @Output() changed = new EventEmitter<void>();

    constructor(
        private dialogService: DialogService,
        private membersService: MembersService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private dr: DestroyRef,
    ) {}

    @ignoreBeforeCompletion
    removeFromOrganization() {
        return this.dialogService
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r.status === DialogResponseStatus.Success),
                switchMap(() =>
                    this.membersService.expelOrgMember({
                        orgId: this.organization.id,
                        userId: this.member.id,
                    }),
                ),
                takeUntilDestroyed(this.dr),
            )
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.changed.emit();
                },
                (err) => this.errorService.error(err),
            );
    }

    @ignoreBeforeCompletion
    editRoles() {
        return this.dialogService
            .open(EditRolesDialogComponent, {
                organization: this.organization,
                userId: this.member.id,
            })
            .afterClosed()
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(() => this.changed.emit());
    }
}

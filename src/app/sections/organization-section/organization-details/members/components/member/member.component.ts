import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ComponentChanges, DialogService, DialogResponseStatus } from '@vality/ng-core';
import { Member, Organization } from '@vality/swag-organizations';
import { filter, switchMap } from 'rxjs/operators';

import { MembersService } from '@dsh/app/api/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { EditRolesDialogComponent } from '../edit-roles-dialog/edit-roles-dialog.component';

@Component({
    selector: 'dsh-member',
    templateUrl: 'member.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MemberComponent implements OnChanges {
    @Input() organization: Organization;
    @Input() member: Member;

    @Output() changed = new EventEmitter<void>();

    constructor(
        private dialogService: DialogService,
        private organizationManagementService: OrganizationManagementService,
        private membersService: MembersService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private dr: DestroyRef,
    ) {}

    ngOnChanges({ organization }: ComponentChanges<MemberComponent>) {
        if (organization) {
            this.organizationManagementService.init(organization.currentValue);
        }
    }

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

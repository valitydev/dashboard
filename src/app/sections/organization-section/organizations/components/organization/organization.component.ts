import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentChanges, DialogResponseStatus } from '@vality/ng-core';
import { Organization } from '@vality/swag-organizations';
import isNil from 'lodash-es/isNil';
import { filter, pluck, switchMap } from 'rxjs/operators';

import { OrgsService } from '@dsh/app/api/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import {
    ErrorService,
    NotificationService,
    ContextOrganizationService,
} from '@dsh/app/shared/services';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { RenameOrganizationDialogComponent } from '../rename-organization-dialog/rename-organization-dialog.component';
import { RenameOrganizationDialogData } from '../rename-organization-dialog/types/rename-organization-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-organization',
    templateUrl: 'organization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OrganizationManagementService],
})
export class OrganizationComponent implements OnChanges {
    @Input() organization: Organization;

    @Output() changed = new EventEmitter<void>();

    member$ = this.contextOrganizationService.member$;
    membersCount$ = this.organizationManagementService.members$.pipe(pluck('length'));
    hasAdminAccess$ = this.organizationManagementService.hasAdminAccess$;
    isOwner$ = this.organizationManagementService.isOrganizationOwner$;

    constructor(
        private organizationManagementService: OrganizationManagementService,
        private organizationsService: OrgsService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private fetchOrganizationsService: FetchOrganizationsService,
        private contextOrganizationService: ContextOrganizationService,
    ) {}

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (!isNil(organization?.currentValue)) {
            this.organizationManagementService.init(organization.currentValue);
        }
    }

    @ignoreBeforeCompletion
    leave() {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r.status === DialogResponseStatus.Success),
                switchMap(() =>
                    this.organizationsService.cancelOrgMembership({ orgId: this.organization.id }),
                ),
                untilDestroyed(this),
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
    rename() {
        return this.dialog
            .open<
                RenameOrganizationDialogComponent,
                RenameOrganizationDialogData,
                BaseDialogResponseStatus
            >(RenameOrganizationDialogComponent, { data: { organization: this.organization } })
            .afterClosed()
            .pipe(
                filter((r) => r === BaseDialogResponseStatus.Success),
                untilDestroyed(this),
            )
            .subscribe(() => {
                this.fetchOrganizationsService.refresh();
                this.changed.emit();
            });
    }
}

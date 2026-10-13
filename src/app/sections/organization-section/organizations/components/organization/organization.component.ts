import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

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
import { MatDialog } from '@angular/material/dialog';
import { MembersService, OrgsService } from '@dsh/app/api/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import {
    ContextOrganizationService,
    ErrorService,
    NotificationService,
} from '@dsh/app/shared/services';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { ComponentChanges, DialogResponseStatus } from '@vality/matez';
import { Organization } from '@vality/swag-organizations';

import { RenameOrganizationDialogComponent } from '../rename-organization-dialog/rename-organization-dialog.component';
import { RenameOrganizationDialogData } from '../rename-organization-dialog/types/rename-organization-dialog-data';

@Component({
    selector: 'dsh-organization',
    templateUrl: 'organization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class OrganizationComponent implements OnChanges {
    @Input() organization: Organization;

    @Output() changed = new EventEmitter<void>();

    member$ = this.contextOrganizationService.member$;
    membersCount$: Observable<number>;
    hasAdminAccess$: Observable<boolean>;
    isOwner$: Observable<boolean>;
    allowedIps: string[] = [];

    constructor(
        private organizationManagementService: OrganizationManagementService,
        private organizationsService: OrgsService,
        private membersService: MembersService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private fetchOrganizationsService: FetchOrganizationsService,
        private contextOrganizationService: ContextOrganizationService,
        private dr: DestroyRef,
    ) {}

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (!isNil(organization?.currentValue)) {
            const current = organization.currentValue;
            this.membersCount$ = this.membersService
                .listOrgMembers({ orgId: current.id })
                .pipe(map(({ result }) => result.length));
            this.hasAdminAccess$ = this.organizationManagementService
                .hasAdminAccess(current)
                .pipe(shareReplay({ refCount: true, bufferSize: 1 }));
            this.isOwner$ = this.organizationManagementService
                .isOrganizationOwner(current)
                .pipe(shareReplay({ refCount: true, bufferSize: 1 }));
            this.allowedIps = Array.from(organization.currentValue.allowedIps ?? []);
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
                takeUntilDestroyed(this.dr),
            )
            .subscribe(() => {
                this.fetchOrganizationsService.refresh();
                this.changed.emit();
            });
    }
}

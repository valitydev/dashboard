import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroupByValue } from '@vality/ng-core';
import { BehaviorSubject } from 'rxjs';

import { OrgsService } from '@dsh/app/api/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { inProgressTo } from '@dsh/utils';

import { RenameOrganizationDialogData } from './types/rename-organization-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-rename-organization-dialog',
    templateUrl: 'rename-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameOrganizationDialogComponent {
    form: FormGroupByValue<{ name: string }>;
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<
            RenameOrganizationDialogComponent,
            BaseDialogResponseStatus
        >,
        private organizationsService: OrgsService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: RenameOrganizationDialogData,
    ) {
        this.form = this.fb.group<{ name: string }>({ name: data.organization.name });
    }

    @inProgressTo('inProgress$')
    update() {
        return this.organizationsService
            .patchOrg({
                orgId: this.data.organization.id,
                patchOrgRequest: {
                    name: this.form.value.name,
                },
            })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                (err) => this.errorService.error(err),
            );
    }

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}

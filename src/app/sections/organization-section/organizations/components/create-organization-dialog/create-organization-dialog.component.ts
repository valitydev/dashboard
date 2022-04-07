import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Organization } from '@vality/swag-organizations';
import { BehaviorSubject } from 'rxjs';

import { OrgsService } from '@dsh/api/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { inProgressTo } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-create-organization-dialog',
    templateUrl: 'create-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrganizationDialogComponent {
    form = this.fb.group<{ name: string }>({ name: '' });
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<CreateOrganizationDialogComponent, BaseDialogResponseStatus>,
        private organizationsService: OrgsService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private fb: FormBuilder
    ) {}

    @inProgressTo('inProgress$')
    create() {
        return this.organizationsService
            .createOrg({
                organization: {
                    name: this.form.value.name,
                } as Organization,
            })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                (err) => this.errorService.error(err)
            );
    }

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}

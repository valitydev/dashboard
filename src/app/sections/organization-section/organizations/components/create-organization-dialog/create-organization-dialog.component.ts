import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, switchMap } from 'rxjs';
import { first } from 'rxjs/operators';

import { OrgsService } from '@dsh/app/api/organizations';
import { KeycloakTokenInfoService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { inProgressTo } from '@dsh/utils';

@Component({
    selector: 'dsh-create-organization-dialog',
    templateUrl: 'create-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CreateOrganizationDialogComponent {
    form = this.fb.group<{ name: string }>({ name: '' });
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<
            CreateOrganizationDialogComponent,
            BaseDialogResponseStatus
        >,
        private organizationsService: OrgsService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private fb: FormBuilder,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private dr: DestroyRef,
    ) {}

    @inProgressTo('inProgress$')
    create() {
        return this.keycloakTokenInfoService.userID$
            .pipe(
                first(),
                switchMap((owner) =>
                    this.organizationsService.createOrg({
                        organization: {
                            name: this.form.value.name,
                            owner,
                        },
                    }),
                ),
                takeUntilDestroyed(this.dr),
            )
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

import { Component, Injector } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { DialogSuperclass } from '@vality/ng-core';
import { RequestRevokeApiKeyRequestParams } from '@vality/swag-api-keys-v2';

import { ApiKeysService } from '@dsh/app/api/api-keys';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';

@UntilDestroy()
@Component({
    selector: 'dsh-api-key-delete-dialog',
    standalone: true,
    templateUrl: './api-key-delete-dialog.component.html',
    styles: [],
    imports: [BaseDialogModule, SpinnerModule, FlexModule, ButtonModule, TranslocoModule],
})
export class ApiKeyDeleteDialogComponent extends DialogSuperclass<
    ApiKeyDeleteDialogComponent,
    Pick<RequestRevokeApiKeyRequestParams, 'apiKeyId'>
> {
    constructor(
        injector: Injector,
        private apiKeysService: ApiKeysService,
        private errorService: ErrorService,
        private notificationService: NotificationService
    ) {
        super(injector);
    }

    confirm() {
        this.apiKeysService
            .requestRevokeApiKey({ ...this.dialogData, status: 'Revoked' })
            .pipe(untilDestroyed(this))
            .subscribe({
                next: () => {
                    this.notificationService.success();
                    this.closeWithSuccess();
                },
                error: (err) => {
                    this.errorService.error(err);
                },
            });
    }
}

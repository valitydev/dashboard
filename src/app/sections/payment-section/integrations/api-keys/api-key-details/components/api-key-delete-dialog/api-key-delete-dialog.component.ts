import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { DialogSuperclass, NotifyLogService, progressTo } from '@vality/ng-core';
import { RequestRevokeApiKeyRequestParams } from '@vality/swag-api-keys-v2';
import { FlexModule } from 'ng-flex-layout';
import { BehaviorSubject } from 'rxjs';

import { ApiKeysService } from '@dsh/app/api/api-keys';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';

@Component({
    selector: 'dsh-api-key-delete-dialog',
    standalone: true,
    templateUrl: './api-key-delete-dialog.component.html',
    styles: [],
    imports: [
        BaseDialogModule,
        SpinnerModule,
        FlexModule,
        ButtonModule,
        TranslocoModule,
        CommonModule,
    ],
})
export class ApiKeyDeleteDialogComponent extends DialogSuperclass<
    ApiKeyDeleteDialogComponent,
    Pick<RequestRevokeApiKeyRequestParams, 'apiKeyId'>
> {
    progress$ = new BehaviorSubject(0);

    constructor(
        private apiKeysService: ApiKeysService,
        private log: NotifyLogService,
        private translocoService: TranslocoService,
        private dr: DestroyRef,
    ) {
        super();
    }

    confirm() {
        this.apiKeysService
            .requestRevokeApiKey({ ...this.dialogData, requestRevoke: { status: 'revoked' } })
            .pipe(progressTo(this.progress$), takeUntilDestroyed(this.dr))
            .subscribe({
                next: () => {
                    this.log.success(
                        this.translocoService.selectTranslate(
                            'apiKeys.deleteDialog.success',
                            null,
                            'payment-section',
                        ),
                    );
                    this.closeWithSuccess();
                },
                error: (err) => {
                    this.log.error(
                        err,
                        this.translocoService.selectTranslate(
                            'apiKeys.deleteDialog.error',
                            null,
                            'payment-section',
                        ),
                    );
                },
            });
    }
}

import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { DialogSuperclass, NotifyLogService, progressTo } from '@vality/ng-core';
import { RequestRevokeApiKeyRequestParams } from '@vality/swag-api-keys-v2';
import { BehaviorSubject } from 'rxjs';

import { ApiKeysService } from '@dsh/app/api/api-keys';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';

@UntilDestroy()
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
        injector: Injector,
        private apiKeysService: ApiKeysService,
        private log: NotifyLogService,
        private translocoService: TranslocoService,
    ) {
        super(injector);
    }

    confirm() {
        this.apiKeysService
            .requestRevokeApiKey({ ...this.dialogData, requestRevoke: { status: 'revoked' } })
            .pipe(progressTo(this.progress$), untilDestroyed(this))
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

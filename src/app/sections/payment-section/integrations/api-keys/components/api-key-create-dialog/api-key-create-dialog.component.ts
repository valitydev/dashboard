import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { DialogSuperclass } from '@vality/ng-core';

import { ApiKeysService } from '@dsh/api/api-keys';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';

@UntilDestroy()
@Component({
    selector: 'dsh-api-key-create-dialog',
    standalone: true,
    templateUrl: './api-key-create-dialog.component.html',
    styles: [],
    imports: [
        BaseDialogModule,
        SpinnerModule,
        FlexModule,
        ButtonModule,
        TranslocoModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        ClipboardModule,
    ],
})
export class ApiKeyCreateDialogComponent extends DialogSuperclass<ApiKeyCreateDialogComponent> {
    form = this.fb.group({ name: '' });
    apiKey: string;

    constructor(
        injector: Injector,
        private apiKeysService: ApiKeysService,
        private errorService: ErrorService,
        private notificationService: NotificationService,
        private fb: NonNullableFormBuilder,
        private clipboard: Clipboard,
        private transloco: TranslocoService
    ) {
        super(injector);
    }

    confirm() {
        this.apiKeysService
            .issueApiKey()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this.apiKey = res.accessToken;
                },
                error: (err) => {
                    this.errorService.error(err);
                },
            });
    }

    copy() {
        if (this.clipboard.copy(this.apiKey)) {
            this.notificationService.success(
                this.transloco.selectTranslate('apiKeys.copy.success', null, 'payment-section')
            );
        } else {
            this.notificationService.error(
                this.transloco.selectTranslate('apiKeys.copy.error', null, 'payment-section')
            );
        }
    }
}

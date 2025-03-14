import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { DialogSuperclass, NotifyLogService, progressTo } from '@vality/matez';
import { FlexModule } from 'ng-flex-layout';
import { BehaviorSubject } from 'rxjs';

import { ApiKeysService } from '@dsh/app/api/api-keys';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services';
import { SpinnerModule } from '@dsh/components/indicators';

@Component({
    selector: 'dsh-api-key-create-dialog',
    templateUrl: './api-key-create-dialog.component.html',
    styles: [],
    imports: [
        BaseDialogModule,
        SpinnerModule,
        FlexModule,
        MatButtonModule,
        TranslocoModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        ClipboardModule,
    ],
})
export class ApiKeyCreateDialogComponent extends DialogSuperclass<ApiKeyCreateDialogComponent> {
    form = this.fb.group({ name: '' });
    progress$ = new BehaviorSubject(0);
    accessToken?: string;

    constructor(
        private apiKeysService: ApiKeysService,
        private errorService: ErrorService,
        private log: NotifyLogService,
        private fb: NonNullableFormBuilder,
        private clipboard: Clipboard,
        private transloco: TranslocoService,
        private dr: DestroyRef,
    ) {
        super();
    }

    confirm() {
        this.apiKeysService
            .issueApiKey({ apiKeyIssue: { name: this.form.value.name } })
            .pipe(progressTo(this.progress$), takeUntilDestroyed(this.dr))
            .subscribe({
                next: (res) => {
                    this.accessToken = res.accessToken;
                },
                error: (err) => {
                    this.errorService.error(err);
                },
            });
    }

    copy() {
        if (this.clipboard.copy(this.accessToken)) {
            this.log.success(
                this.transloco.selectTranslate('apiKeys.copy.success', null, 'payment-section'),
            );
        } else {
            this.log.error(
                this.transloco.selectTranslate('apiKeys.copy.error', null, 'payment-section'),
            );
        }
    }
}

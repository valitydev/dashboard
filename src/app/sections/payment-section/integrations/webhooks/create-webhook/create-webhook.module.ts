import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateWebhookDialogComponent } from './create-webhook-dialog.component';
import { CreateWebhookFormComponent } from './create-webhook-form';
import { CreateWebhookService } from './create-webhook.service';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        ButtonModule,
        TranslocoModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatRadioModule,
        MatCheckboxModule,
        MatInputModule,
        BaseDialogModule,
    ],
    declarations: [CreateWebhookDialogComponent, CreateWebhookFormComponent],
    providers: [CreateWebhookService],
})
export class CreateWebhookModule {}

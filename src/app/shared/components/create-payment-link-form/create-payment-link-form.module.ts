import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { UrlShortenerModule } from '@dsh/app/api/url-shortener';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { CreatePaymentLinkFormComponent } from './create-payment-link-form.component';
import { LocaleCode } from './locale-code.pipe';

@NgModule({
    imports: [
        LayoutModule,
        TranslocoModule,
        FlexLayoutModule,
        FormControlsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        UrlShortenerModule,
        ClipboardModule,
        ConfirmActionDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatMenuModule,
    ],
    declarations: [CreatePaymentLinkFormComponent, LocaleCode],
    exports: [CreatePaymentLinkFormComponent],
})
export class CreatePaymentLinkFormModule {}

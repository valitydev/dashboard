import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { InvoiceTemplatesModule, UrlShortenerModule } from '../../../../api';
import { CreatePaymentLinkModule } from '../../../create-payment-link';
import { InvoiceTemplateFormComponent } from './invoice-template-form';
import { PaymentLinkRoutingModule } from './payment-link-routing.module';
import { PaymentLinkComponent } from './payment-link.component';

const EXPORTED_DECLARATIONS = [PaymentLinkComponent];

@NgModule({
    imports: [
        PaymentLinkRoutingModule,
        LayoutModule,
        TranslocoModule,
        FlexLayoutModule,
        FormControlsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatRadioModule,
        ButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        UrlShortenerModule,
        InvoiceTemplatesModule,
        ConfirmActionDialogModule,
        MatDialogModule,
        CreatePaymentLinkModule,
    ],
    declarations: [...EXPORTED_DECLARATIONS, InvoiceTemplateFormComponent],
    exports: EXPORTED_DECLARATIONS,
})
export class PaymentLinkModule {}
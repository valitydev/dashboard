import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';

import { CreatePaymentLinkFormModule } from '@dsh/app/shared/components/create-payment-link-form';
import { DialogModule } from '@dsh/app/shared/components/dialog';
import { CreatePaymentLinkModule } from '@dsh/app/shared/services/create-payment-link';

import { CreatePaymentLinkDialogComponent } from './create-payment-link-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        CreatePaymentLinkFormModule,
        DialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        CreatePaymentLinkModule,
    ],
    declarations: [CreatePaymentLinkDialogComponent],
    exports: [CreatePaymentLinkDialogComponent],
})
export class CreatePaymentLinkDialogModule {}

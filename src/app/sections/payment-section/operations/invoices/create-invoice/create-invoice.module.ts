import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { CreateInvoiceFormModule } from '@dsh/app/shared/components/create-invoice-form';
import { DialogModule } from '@dsh/app/shared/components/dialog';

import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';
import { CreateInvoiceService } from './create-invoice.service';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        CreateInvoiceFormModule,
        DialogModule,
        FlexLayoutModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    declarations: [CreateInvoiceDialogComponent],
    providers: [CreateInvoiceService],
})
export class CreateInvoiceModule {}

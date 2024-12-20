import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AmountCurrencyModule } from '@dsh/app/shared';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { InvoiceRandomizeAmountModule } from '../invoice-randomize-amount-form';

import { CreateInvoiceFormComponent } from './create-invoice-form.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSnackBarModule,
        TranslocoModule,
        MatMenuModule,
        MatDialogModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatDividerModule,
        MatDialogModule,
        ConfirmActionDialogModule,
        AmountCurrencyModule,
        MatCheckboxModule,
        InvoiceRandomizeAmountModule,
    ],
    declarations: [CreateInvoiceFormComponent],
    exports: [CreateInvoiceFormComponent],
})
export class CreateInvoiceFormModule {}

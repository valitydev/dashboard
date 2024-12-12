import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { InvoiceRandomizeAmountModule } from '@dsh/app/shared/components/invoice-randomize-amount-form';
import { ApiModelTypesModule } from '@dsh/app/shared/pipes';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { CreateInvoiceTemplateComponent } from './create-invoice-template.component';
import { CreateInvoiceTemplateService } from './create-invoice-template.service';

const EXPORTED_DECLARATIONS = [CreateInvoiceTemplateComponent];

@NgModule({
    imports: [
        LayoutModule,
        TranslocoModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        ConfirmActionDialogModule,
        MatDialogModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ApiModelTypesModule,
        InvoiceRandomizeAmountModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [CreateInvoiceTemplateService],
})
export class CreateInvoiceTemplateModule {}

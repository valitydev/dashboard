import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AmountCurrencyModule } from '@dsh/app/shared';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceRandomizeAmountFormComponent } from './invoice-randomize-amount-form.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormControlsModule,
        TranslocoModule,
        AmountCurrencyModule,
        MatCheckboxModule,
        MatRadioModule,
    ],
    declarations: [InvoiceRandomizeAmountFormComponent],
    exports: [InvoiceRandomizeAmountFormComponent],
})
export class InvoiceRandomizeAmountModule {}

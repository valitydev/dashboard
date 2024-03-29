import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { CancelInvoiceDialogComponent } from './components/cancel-invoice-dialog/cancel-invoice-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ButtonModule,
        BaseDialogModule,
    ],
    declarations: [CancelInvoiceDialogComponent],
})
export class CancelInvoiceModule {}

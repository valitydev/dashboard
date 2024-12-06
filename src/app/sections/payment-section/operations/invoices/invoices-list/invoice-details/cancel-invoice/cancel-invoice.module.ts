import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';

import { CancelInvoiceDialogComponent } from './components/cancel-invoice-dialog/cancel-invoice-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BaseDialogModule,
    ],
    declarations: [CancelInvoiceDialogComponent],
})
export class CancelInvoiceModule {}

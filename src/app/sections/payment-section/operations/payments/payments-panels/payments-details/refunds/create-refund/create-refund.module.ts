import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { MaxLengthInputModule } from '@dsh/app/shared/components/inputs/max-length-input/max-length-input.module';
import { AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { FormatInputModule } from '@dsh/components/form-controls';

import { CreateRefundDialogComponent } from './components/create-refund-dialog/create-refund-dialog.component';
import { CreateRefundService } from './create-refund.service';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        ButtonModule,
        TranslocoModule,

        FormatInputModule,
        MaxLengthInputModule,
        BaseDialogModule,
        AmountCurrencyModule,
    ],
    declarations: [CreateRefundDialogComponent],
    providers: [CreateRefundService],
})
export class CreateRefundModule {}

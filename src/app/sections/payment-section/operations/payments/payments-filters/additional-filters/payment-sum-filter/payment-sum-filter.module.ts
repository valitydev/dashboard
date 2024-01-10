import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { FormatInputModule } from '@dsh/components/form-controls';

import { PaymentSumFilterComponent } from './payment-sum-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormatInputModule,
        FlexLayoutModule,
        TranslocoModule,
        MatFormFieldModule,
    ],
    declarations: [PaymentSumFilterComponent],
    exports: [PaymentSumFilterComponent],
})
export class PaymentSumFilterModule {}

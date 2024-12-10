import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { FormatInputModule } from '@dsh/components/form-controls';

import { DepositSumFilterComponent } from './deposit-sum-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormatInputModule,
        FlexLayoutModule,
        TranslocoModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [DepositSumFilterComponent],
    exports: [DepositSumFilterComponent],
})
export class DepositSumFilterModule {}

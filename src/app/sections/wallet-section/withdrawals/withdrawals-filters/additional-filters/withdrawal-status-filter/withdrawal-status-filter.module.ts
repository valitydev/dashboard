import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';
import { RadioGroupFieldModule } from '@dsh/components/form-controls/radio-group-field';

import { WithdrawalStatusLabelPipe } from './pipes';
import { WithdrawalStatusFilterComponent } from './withdrawal-status-filter.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatRadioModule,
        ExpandableRadioGroupModule,
        MatDialogModule,
        RadioGroupFieldModule,
    ],
    declarations: [WithdrawalStatusFilterComponent, WithdrawalStatusLabelPipe],
    exports: [WithdrawalStatusFilterComponent],
})
export class WithdrawalStatusFilterModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';

import { DialogFiltersComponent } from './components';
import { MainInfoFiltersModule } from './main-info-filters';
import { WithdrawalStatusFilterModule } from './withdrawal-status-filter';
import { WithdrawalSumFilterModule } from './withdrawal-sum-filter';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        MatButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatIconModule,
        MainInfoFiltersModule,
        MatDividerModule,
        WithdrawalStatusFilterModule,
        WithdrawalSumFilterModule,
    ],
    declarations: [DialogFiltersComponent],
})
export class AdditionalFiltersModule {}

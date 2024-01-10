import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { AdditionalFiltersModule } from './additional-filters';
import { WithdrawalsFiltersComponent } from './withdrawals-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        DateRangeFilterModule,
        FiltersGroupModule,
        ReactiveFormsModule,
        MatDialogModule,
        FilterModule,
        AdditionalFiltersModule,
    ],
    declarations: [WithdrawalsFiltersComponent],
    exports: [WithdrawalsFiltersComponent],
})
export class WithdrawalsFiltersModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { DaterangeManagerModule } from '@dsh/app/shared/services/date-range-manager';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { AdditionalFiltersModule } from './additional-filters';
import { DepositsFiltersComponent } from './deposits-filters.component';

@NgModule({
    imports: [
        DaterangeManagerModule,
        FlexModule,
        CommonModule,
        TranslocoModule,
        AdditionalFiltersModule,
        DateRangeFilterModule,
        FiltersGroupModule,
        ReactiveFormsModule,
        FilterModule,
    ],
    declarations: [DepositsFiltersComponent],
    exports: [DepositsFiltersComponent],
})
export class DepositsFiltersModule {}

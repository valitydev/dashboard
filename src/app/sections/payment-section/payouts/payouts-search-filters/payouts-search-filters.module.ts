import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { PayoutsSearchFiltersComponent } from './payouts-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ShopsFilterModule,
        ReactiveFormsModule,
        FiltersGroupModule,
        DateRangeFilterModule,
    ],
    exports: [PayoutsSearchFiltersComponent],
    declarations: [PayoutsSearchFiltersComponent],
})
export class PayoutsSearchFiltersModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule, FlexModule } from 'ng-flex-layout';

import { CurrencyFilterModule } from '@dsh/app/shared/components/filters/currency-filter';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { AnalyticsSearchFiltersComponent } from './analytics-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        CurrencyFilterModule,
        FlexLayoutModule,
        ShopsFilterModule,
        ReactiveFormsModule,
        FiltersGroupModule,
        DateRangeFilterModule,
    ],
    exports: [AnalyticsSearchFiltersComponent],
    declarations: [AnalyticsSearchFiltersComponent],
})
export class AnalyticsSearchFiltersModule {}

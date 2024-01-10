import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ReportTypesFieldModule } from '@dsh/app/shared/components/inputs/report-types-field';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { ReportPipesModule } from '../report-pipes';

import { ReportTypesFilterComponent } from './report-types-filter';
import { ReportsSearchFiltersComponent } from './reports-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FilterModule,
        FlexLayoutModule,
        ReportPipesModule,
        ReportTypesFieldModule,
        ReactiveFormsModule,
        FiltersGroupModule,
        DateRangeFilterModule,
    ],
    declarations: [ReportsSearchFiltersComponent, ReportTypesFilterComponent],
    exports: [ReportsSearchFiltersComponent],
})
export class ReportsSearchFiltersModule {}

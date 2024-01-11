import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ClaimFilterModule } from '@dsh/app/shared/components/filters/claim-filter';
import { ClaimStatusesFieldModule } from '@dsh/app/shared/components/inputs/claim-statuses-field';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { ClaimsSearchFiltersComponent } from './claims-search-filters.component';
import { ClaimStatusesFilterComponent } from './components/claim-statuses-filter/claim-statuses-filter.component';

@NgModule({
    declarations: [ClaimsSearchFiltersComponent, ClaimStatusesFilterComponent],
    imports: [
        TranslocoModule,
        CommonModule,
        FlexModule,
        FiltersGroupModule,
        FilterModule,
        ClaimStatusesFieldModule,
        ReactiveFormsModule,
        ClaimFilterModule,
    ],
    exports: [ClaimsSearchFiltersComponent],
})
export class ClaimsSearchFiltersModule {}

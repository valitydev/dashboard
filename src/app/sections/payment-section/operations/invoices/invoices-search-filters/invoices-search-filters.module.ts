import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { InvoiceStatusFilterModule, RefundStatusFilterModule } from '@dsh/app/shared/components';
import { InvoicesFilterModule } from '@dsh/app/shared/components/filters/invoices-filter';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { AdditionalFiltersModule } from './additional-filters';
import { InvoicesSearchFiltersComponent } from './invoices-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        InvoicesFilterModule,
        RefundStatusFilterModule,
        InvoiceStatusFilterModule,
        ReactiveFormsModule,
        ShopsFilterModule,
        FiltersGroupModule,
        DateRangeFilterModule,
        FilterModule,
        AdditionalFiltersModule,
    ],
    declarations: [InvoicesSearchFiltersComponent],
    exports: [InvoicesSearchFiltersComponent],
})
export class InvoicesSearchFiltersModule {}

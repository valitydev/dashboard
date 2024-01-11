import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { InvoicesFilterModule } from '@dsh/app/shared/components';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { DaterangeManagerModule } from '@dsh/app/shared/services/date-range-manager';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter/filter.module';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { AdditionalFiltersModule } from './additional-filters';
import { CardBinPanFilterModule } from './card-bin-pan-filter';
import { PaymentsFiltersComponent } from './payments-filters.component';

@NgModule({
    imports: [
        CommonModule,
        AdditionalFiltersModule,
        TranslocoModule,
        FlexLayoutModule,
        FilterModule,
        InvoicesFilterModule,
        DaterangeManagerModule,
        CardBinPanFilterModule,
        ReactiveFormsModule,
        ShopsFilterModule,
        FiltersGroupModule,
        DateRangeFilterModule,
    ],
    declarations: [PaymentsFiltersComponent],
    exports: [PaymentsFiltersComponent],
})
export class PaymentsFiltersModule {}

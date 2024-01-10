import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ApiModelTypesModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { FormatInputModule } from '@dsh/components/form-controls';
import { SpinnerModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { CreatePayoutModule } from './create-payout';
import { PayoutsListModule } from './payouts-list';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { PayoutsSearchFiltersModule } from './payouts-search-filters';
import { PayoutsComponent } from './payouts.component';

@NgModule({
    imports: [
        PayoutsRoutingModule,
        MatCommonModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        MatFormFieldModule,
        MatOptionModule,
        CommonModule,
        MatSelectModule,
        MatInputModule,
        SpinnerModule,
        ScrollUpModule,
        ShowMorePanelModule,
        FormatInputModule,
        ApiModelTypesModule,
        PayoutsSearchFiltersModule,
        PayoutsListModule,
        EmptySearchResultModule,
        CreatePayoutModule,
        DateRangeFilterModule,
    ],
    declarations: [PayoutsComponent],
    exports: [PayoutsComponent],
})
export class PayoutsModule {}

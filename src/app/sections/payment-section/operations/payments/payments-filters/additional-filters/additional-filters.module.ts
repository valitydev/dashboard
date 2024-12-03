import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';

import { CardFilterModule } from './card-filter';
import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { InvoicesFilterModule } from './invoices-filter';
import { MainFiltersModule } from './main-filters';
import { PaymentStatusFilterModule } from './payment-status-filter';
import { PaymentSumFilterModule } from './payment-sum-filter';
import { PaymentSystemFilterModule } from './payment-system-filter/payment-system-filter.module';
import { ShopsFilterModule } from './shops-filter';
import { TokenProviderFilterModule } from './token-provider-filter/token-provider-filter.module';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        MatButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatIconModule,
        MainFiltersModule,
        PaymentStatusFilterModule,
        MatDividerModule,
        PaymentSumFilterModule,
        TokenProviderFilterModule,
        PaymentSystemFilterModule,
        InvoicesFilterModule,
        ShopsFilterModule,
        CardFilterModule,
    ],
    declarations: [DialogFiltersComponent],
})
export class AdditionalFiltersModule {}

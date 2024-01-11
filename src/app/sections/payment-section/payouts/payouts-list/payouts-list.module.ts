import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import {
    ApiModelRefsModule,
    ApiModelTypesModule,
    AmountCurrencyModule,
} from '@dsh/app/shared/pipes';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { PayoutsDetailsModule } from '../payouts-details';

import { PayoutRowComponent } from './payout-row';
import { PayoutRowHeaderComponent } from './payout-row-header';
import { PayoutsListComponent } from './payouts-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        PayoutsDetailsModule,

        ApiModelTypesModule,
        ApiModelRefsModule,
        AmountCurrencyModule,
    ],
    declarations: [PayoutsListComponent, PayoutRowHeaderComponent, PayoutRowComponent],
    exports: [PayoutsListComponent],
})
export class PayoutsListModule {}

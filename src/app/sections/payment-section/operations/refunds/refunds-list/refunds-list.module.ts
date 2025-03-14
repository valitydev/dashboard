import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { RefundDetailsModule as ApiRefundDetailsModule } from '@dsh/app/shared/components';
import { AmountCurrencyModule, ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { RefundRowComponent } from './components/refund-row/refund-row.component';
import { RefundRowHeaderComponent } from './components/refund-row-header/refund-row-header.component';
import { RefundDetailsModule } from './refund-details';
import { RefundsListComponent } from './refunds-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        RefundDetailsModule,

        ApiModelRefsModule,
        ApiRefundDetailsModule,
        AmountCurrencyModule,
    ],
    declarations: [RefundsListComponent, RefundRowHeaderComponent, RefundRowComponent],
    exports: [RefundsListComponent],
})
export class RefundsListModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BalanceModule } from '@dsh/app/shared/components/balance/balance.module';
import { PaymentStatusComponent } from '@dsh/app/shared/components/payment-status';
import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, CardModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { PaymentsRowComponent } from './components/row/payments-row.component';
import { PaymentsRowHeaderComponent } from './components/row-header/payments-row-header.component';
import { PaymentDetailHeaderModule } from './payment-detail-header';
import { PaymentsDetailsModule } from './payments-details';
import { PaymentsPanelsComponent } from './payments-panels.component';

@NgModule({
    imports: [
        CommonModule,
        RowModule,
        FlexLayoutModule,
        TranslocoModule,
        SpinnerModule,
        EmptySearchResultModule,
        AccordionModule,
        CardModule,
        ShowMorePanelModule,
        PaymentDetailHeaderModule,
        PaymentsDetailsModule,
        BalanceModule,
        ApiModelRefsModule,
        ButtonModule,
        PaymentStatusComponent,
    ],
    declarations: [PaymentsPanelsComponent, PaymentsRowHeaderComponent, PaymentsRowComponent],
    exports: [PaymentsPanelsComponent],
})
export class PaymentsPanelsModule {}

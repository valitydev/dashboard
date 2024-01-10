import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { PaymentStatusComponent } from '@dsh/app/shared/components/payment-status';
import { ApiModelRefsModule, AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';
import { CollapseModule } from '@dsh/components/layout/collapse';

import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { ChargeAmountComponent } from './components/charge-amount/charge-amount.component';
import { PaymentFeeComponent } from './components/payment-fee/payment-fee.component';
import { PaymentStatusDetailsItemComponent } from './components/payment-status-details-item/payment-status-details-item.component';
import { ResourcePayerComponent } from './components/resource-payer/resource-payer.component';
import { ShopNameComponent } from './components/shop-name/shop-name.component';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentToolModule } from './payment-tool';
import { PaymentErrorMessagePipe } from './pipes/payment-error-message/payment-error-message.pipe';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        PaymentToolModule,
        CollapseModule,
        ApiModelRefsModule,
        AmountCurrencyModule,
        PaymentStatusComponent,
    ],
    declarations: [
        PaymentMainInfoComponent,
        PaymentErrorMessagePipe,
        ChargeAmountComponent,
        PaymentFeeComponent,
        ResourcePayerComponent,
        ShopNameComponent,
        AdditionalInfoComponent,
        PaymentStatusDetailsItemComponent,
    ],
    exports: [PaymentMainInfoComponent, PaymentStatusDetailsItemComponent],
})
export class PaymentMainInfoModule {}

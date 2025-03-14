import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ErrorModule } from '@dsh/app/shared/services';

import { HoldDetailsModule } from './hold-details';
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentInvoiceInfoModule } from './payment-invoice-info';
import { PaymentMainInfoModule } from './payment-main-info';
import { RefundsModule } from './refunds';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        TranslocoModule,
        PaymentInvoiceInfoModule,
        MatDividerModule,
        PaymentMainInfoModule,
        ErrorModule,
        RefundsModule,
        HoldDetailsModule,
    ],
    declarations: [PaymentDetailsComponent],
    exports: [PaymentDetailsComponent],
})
export class PaymentsDetailsModule {}

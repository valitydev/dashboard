import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InvoiceDetailsModule } from '@dsh/app/shared/components';
import { TranslocoModule } from '@jsverse/transloco';

import { PaymentInvoiceInfoComponent } from './payment-invoice-info.component';

@NgModule({
    imports: [
        CommonModule,
        InvoiceDetailsModule,
        TranslocoModule,
        FlexLayoutModule,
        MatIconModule,
        RouterModule.forChild([{ path: '', component: PaymentInvoiceInfoComponent }]),
    ],
    declarations: [PaymentInvoiceInfoComponent],
    exports: [PaymentInvoiceInfoComponent],
})
export class PaymentInvoiceInfoModule {}

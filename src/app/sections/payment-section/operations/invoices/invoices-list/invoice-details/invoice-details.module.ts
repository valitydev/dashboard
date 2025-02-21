import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AuthModule } from '@dsh/app/auth';
import {
    RefundDetailsModule as ApiRefundDetailsModule,
    InvoiceDetailsModule as InvoiceInvoiceDetailsModule,
    PaymentDetailsModule,
} from '@dsh/app/shared/components';
import { AmountCurrencyModule, ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { CancelInvoiceModule } from './cancel-invoice';
import { InvoiceActionsComponent } from './components/invoice-actions/invoice-actions.component';
import { InvoiceCartLineComponent } from './components/invoice-cart-info/cart-info/invoice-cart-line.component';
import { InvoiceCartInfoComponent } from './components/invoice-cart-info/invoice-cart-info.component';
import { InvoiceMainInfoComponent } from './components/invoice-main-info/invoice-main-info.component';
import { InvoicePaymentsComponent } from './components/invoice-payments/invoice-payments.component';
import { CreatePaymentLinkDialogModule } from './create-payment-link-dialog';
import { FulfillInvoiceModule } from './fulfill-invoice';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { TaxModeToTaxRatePipe } from './pipes/tax-mode-to-tax-rate/tax-mode-to-tax-rate.pipe';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        MatButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatSnackBarModule,
        MatDividerModule,
        IndicatorsModule,
        ApiModelRefsModule,
        ApiRefundDetailsModule,
        PaymentDetailsModule,
        InvoiceInvoiceDetailsModule,

        CreatePaymentLinkDialogModule,
        CancelInvoiceModule,
        FulfillInvoiceModule,
        RouterModule,
        MatIconModule,
        AmountCurrencyModule,
        AuthModule,
    ],
    declarations: [
        InvoiceDetailsComponent,
        InvoiceMainInfoComponent,
        InvoiceCartInfoComponent,
        InvoiceCartLineComponent,
        TaxModeToTaxRatePipe,
        InvoiceActionsComponent,
        InvoicePaymentsComponent,
    ],
    exports: [InvoiceDetailsComponent],
})
export class InvoiceDetailsModule {}

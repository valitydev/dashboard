import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../../layout';
import { PaymentDetailsComponent } from './payment-details.component';
import { StatusModule } from '../../status';
import { LocaleModule } from '../../locale';
import { DetailsComponent } from './details';
import { CardModule } from '../../layout/card';
import { DetailsItemComponent } from './details-item';
import {
    BankCardComponent,
    DigitalWalletComponent,
    PaymentTerminalComponent,
    PaymentToolComponent
} from './payment-tool';
import { AmountPipe } from './amount.pipe';
import { CustomerPayerComponent, PayerDetailsComponent, PaymentResourcePayerComponent } from './payer-details';
import { HoldDetailsComponent } from './hold-details';
import { ButtonModule } from '../../button';
import { RecurrentDetailsComponent } from './recurrent-details';
import { InvoiceDetailsComponent } from './invoice-details';
import { RefundItemComponent, RefundsComponent } from './refunds';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { StatusDetailsItemComponent } from './status-details-item';
import { SecondaryTitleDirective } from './secondary-title';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { BankCardPipe } from './bank-card.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { SearchModule } from '../../search';
import { ShopDetailsComponent, ShopLocationUrlComponent } from './shop-details';
import { ViewUtilsModule } from '../../view-utils';
import { MakeRecurrentComponent } from './make-recurrent';
import { InvoiceModule } from '../../invoice';
import { HeadlineComponent } from './headline';
import { HumanizeDurationModule } from '../../humanize-duration';

@NgModule({
    imports: [
        LayoutModule,
        StatusModule,
        MatIconModule,
        LocaleModule,
        FlexLayoutModule,
        RouterModule,
        CardModule,
        ButtonModule,
        CommonModule,
        PaymentDetailsRoutingModule,
        SearchModule,
        ViewUtilsModule,
        InvoiceModule,
        HumanizeDurationModule
    ],
    declarations: [
        PaymentDetailsComponent,
        DetailsComponent,
        DetailsItemComponent,
        StatusDetailsItemComponent,
        PaymentToolComponent,
        AmountPipe,
        PayerDetailsComponent,
        HoldDetailsComponent,
        RecurrentDetailsComponent,
        InvoiceDetailsComponent,
        ShopDetailsComponent,
        RefundsComponent,
        RefundItemComponent,
        SecondaryTitleDirective,
        CurrencySymbolPipe,
        BankCardPipe,
        PhoneNumberPipe,
        DigitalWalletComponent,
        BankCardComponent,
        PaymentTerminalComponent,
        CustomerPayerComponent,
        PaymentResourcePayerComponent,
        ShopLocationUrlComponent,
        MakeRecurrentComponent,
        HeadlineComponent
    ]
})
export class PaymentDetailsModule {}
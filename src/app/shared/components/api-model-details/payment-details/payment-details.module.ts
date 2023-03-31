import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentStatusColorPipe } from './payment-status-color.pipe';
import { PaymentStatusComponent } from '../../payment-status';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        StatusModule,
        AmountCurrencyModule,
        PaymentStatusComponent,
    ],
    declarations: [PaymentDetailsComponent, PaymentStatusColorPipe],
    exports: [PaymentDetailsComponent, PaymentStatusColorPipe],
})
export class PaymentDetailsModule {}

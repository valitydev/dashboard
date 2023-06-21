import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { PaymentsAmountComponent } from './payments-amount.component';
import { PercentDifferenceModule } from '../percent-difference';
import { StatItemModule } from '../stat-item/stat-item.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        MatSelectModule,
        SpinnerModule,
        CardModule,
        PercentDifferenceModule,
        StatItemModule,
    ],
    declarations: [PaymentsAmountComponent],
    exports: [PaymentsAmountComponent],
})
export class PaymentsAmountModule {}

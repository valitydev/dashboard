import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { PercentDifferenceModule } from '../percent-difference';
import { StatItemModule } from '../stat-item/stat-item.module';

import { RefundsAmountComponent } from './refunds-amount.component';

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
    declarations: [RefundsAmountComponent],
    exports: [RefundsAmountComponent],
})
export class RefundsAmountModule {}

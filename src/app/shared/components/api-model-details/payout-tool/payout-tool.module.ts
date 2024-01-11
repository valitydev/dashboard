import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { LayoutModule } from '@dsh/components/layout';

import { BankAccountDetailsModule } from '../bank-account-details';
import { PayoutToolDetailsModule } from '../payout-tool-details';

import { PayoutToolComponent } from './payout-tool.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        TranslocoModule,
        CommonModule,
        LayoutModule,
        BankAccountDetailsModule,
        MatDividerModule,
        PayoutToolDetailsModule,
    ],
    declarations: [PayoutToolComponent],
    exports: [PayoutToolComponent],
})
export class PayoutToolModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { LayoutModule } from '@dsh/components/layout';

import { ApiModelRefsModule } from '../../../pipes';
import { BankAccountDetailsModule } from '../bank-account-details';

import { InternationalBankAccountComponent } from './international-bank-account';
import { PayoutToolDetailsComponent } from './payout-tool-details.component';
import { WalletComponent } from './wallet';

@NgModule({
    imports: [
        FlexLayoutModule,
        TranslocoModule,
        CommonModule,
        LayoutModule,
        BankAccountDetailsModule,
        MatDividerModule,
        ApiModelRefsModule,
        RouterModule,
    ],
    declarations: [PayoutToolDetailsComponent, InternationalBankAccountComponent, WalletComponent],
    exports: [PayoutToolDetailsComponent],
})
export class PayoutToolDetailsModule {}

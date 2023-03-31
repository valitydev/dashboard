import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DepositRevertDetailsComponent } from './deposit-revert-details.component';
import { DepositRevertStatusColorPipe } from './pipes';
import { ApiModelRefsModule, AmountCurrencyModule } from '../../../pipes';

@NgModule({
    imports: [
        TranslocoModule,

        FlexModule,
        CommonModule,
        StatusModule,
        ApiModelRefsModule,
        LayoutModule,
        AmountCurrencyModule,
    ],
    declarations: [DepositRevertDetailsComponent, DepositRevertStatusColorPipe],
    exports: [DepositRevertDetailsComponent, DepositRevertStatusColorPipe],
})
export class DepositRevertDetailsModule {}

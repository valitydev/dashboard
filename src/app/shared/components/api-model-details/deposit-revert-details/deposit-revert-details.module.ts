import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ApiModelRefsModule, AmountCurrencyModule } from '../../../pipes';

import { DepositRevertDetailsComponent } from './deposit-revert-details.component';
import { DepositRevertStatusColorPipe } from './pipes';

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

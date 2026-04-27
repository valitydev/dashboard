import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

import { DepositStatusColorPipe } from './deposit-status-color.pipe';
import { PayoutToolDetailsTypePipe } from './payout-tool-details-type.pipe';
import { WithdrawalStatusColorPipe } from './withdrawal-status-color.pipe';

const DECLARATIONS = [PayoutToolDetailsTypePipe, DepositStatusColorPipe, WithdrawalStatusColorPipe];

@NgModule({
    imports: [TranslocoModule],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class ApiModelTypesModule {}

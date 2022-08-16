import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { DepositStatusColorPipe } from './deposit-status-color.pipe';
import { PayoutToolDetailsTypePipe } from './payout-tool-details-type.pipe';
import { WithdrawalStatusColorPipe } from './withdrawal-status-color.pipe';

const DECLARATIONS = [
    ClaimStatusColorPipe,
    PayoutToolDetailsTypePipe,
    DepositStatusColorPipe,
    WithdrawalStatusColorPipe,
];

@NgModule({
    imports: [TranslocoModule],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class ApiModelTypesModule {}

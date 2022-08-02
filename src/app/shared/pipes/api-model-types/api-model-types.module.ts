import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { DepositStatusColorPipe } from './deposit-status-color.pipe';
import { InvoiceTemplateCostTypeNamePipe } from './invoice-template-cost-type-name.pipe';
import { InvoiceTemplateTypeNamePipe } from './invoice-template-type-name.pipe';
import { PayoutToolDetailsTypePipe } from './payout-tool-details-type.pipe';
import { WithdrawalStatusColorPipe } from './withdrawal-status-color.pipe';
import { WithdrawalStatusNamePipe } from './withdrawal-status-name.pipe';

const DECLARATIONS = [
    ClaimStatusColorPipe,
    PayoutToolDetailsTypePipe,
    DepositStatusColorPipe,
    InvoiceTemplateTypeNamePipe,
    InvoiceTemplateCostTypeNamePipe,
    WithdrawalStatusNamePipe,
    WithdrawalStatusColorPipe,
];

@NgModule({
    imports: [TranslocoModule],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class ApiModelTypesModule {}

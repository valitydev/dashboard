import { PartyModification, PayoutToolInfo, RussianBankAccount } from '@vality/swag-claim-management';

import { createContractPayoutToolInfoModification } from './create-contract-payout-tool-info-modification';

export function createRussianContractPayoutToolInfoModification(
    id: string,
    payoutToolID: string,
    params: Omit<RussianBankAccount, 'payoutToolType'>
): PartyModification {
    return createContractPayoutToolInfoModification(id, payoutToolID, {
        payoutToolInfo: {
            payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
            ...params,
        },
    });
}

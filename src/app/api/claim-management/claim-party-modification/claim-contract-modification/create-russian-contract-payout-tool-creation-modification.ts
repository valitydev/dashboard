import { PartyModification, PayoutToolInfo, RussianBankAccount } from '@vality/swag-claim-management';

import { createContractPayoutToolCreationModification } from './create-contract-payout-tool-creation-modification';

export function createRussianContractPayoutToolCreationModification(
    id: string,
    payoutToolID: string,
    params: Omit<RussianBankAccount, 'payoutToolType'>,
    currency?: string
): PartyModification {
    return createContractPayoutToolCreationModification(id, payoutToolID, {
        currency: {
            symbolicCode: currency || 'RUB',
        },
        toolInfo: {
            payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
            ...params,
        },
    });
}

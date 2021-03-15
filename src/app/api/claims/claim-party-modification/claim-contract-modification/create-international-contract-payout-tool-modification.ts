import { InternationalBankAccount, PartyModification, PayoutToolInfo } from '@dsh/api-codegen/claim-management';
import { createContractPayoutToolModification } from '@dsh/api/claims/claim-party-modification';
import PayoutToolTypeEnum = PayoutToolInfo.PayoutToolTypeEnum;

export function createInternationalContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    params: Omit<InternationalBankAccount, 'payoutToolType'>
): PartyModification {
    return createContractPayoutToolModification(id, payoutToolID, {
        currency: {
            symbolicCode: 'USD',
        },
        toolInfo: {
            payoutToolType: PayoutToolTypeEnum.InternationalBankAccount,
            ...params,
        },
    });
}
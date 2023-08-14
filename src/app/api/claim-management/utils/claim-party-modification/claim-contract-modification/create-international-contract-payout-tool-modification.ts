import {
    CorrespondentAccount,
    InternationalBankAccount,
    PartyModification,
    PayoutToolInfo,
} from '@vality/swag-claim-management';
import { Overwrite } from 'utility-types';

import { createContractPayoutToolCreationModification } from './create-contract-payout-tool-creation-modification';

import PayoutToolTypeEnum = PayoutToolInfo.PayoutToolTypeEnum;

export function createInternationalContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    symbolicCode: string,
    {
        correspondentAccount,
        ...params
    }: Overwrite<
        Omit<InternationalBankAccount, 'payoutToolType'>,
        {
            correspondentAccount: Overwrite<
                CorrespondentAccount,
                { accountHolder?: CorrespondentAccount['accountHolder'] }
            >;
        }
    >,
): PartyModification {
    return createContractPayoutToolCreationModification(id, payoutToolID, {
        currency: {
            symbolicCode,
        },
        toolInfo: {
            payoutToolType: PayoutToolTypeEnum.InternationalBankAccount,
            ...params,
            ...(correspondentAccount
                ? {
                      correspondentAccount: {
                          accountHolder: '', // add ui field or remove it
                          ...correspondentAccount,
                      },
                  }
                : {}),
        },
    });
}

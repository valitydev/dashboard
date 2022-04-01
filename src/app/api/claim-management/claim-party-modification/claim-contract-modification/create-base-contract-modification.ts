import { ContractModificationUnit, PartyModification, PartyModificationType } from '@vality/swag-claim-management';

import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';

import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

export function createBaseContractModification<M extends Omit<ContractModificationUnit, 'partyModificationType'>>(
    modification: M
): PartyModification {
    return {
        ...PARTY_MODIFICATION,
        partyModificationType: {
            partyModificationType: PartyModificationTypeEnum.ContractModificationUnit,
            ...modification,
        },
    };
}

import { ContractorModification, PartyModification, PartyModificationType } from '@vality/swag-claim-management';

import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';

import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

export function createBaseContractorModification<M extends Omit<ContractorModification, 'contractorModificationType'>>(
    modification: M
): PartyModification {
    return {
        ...PARTY_MODIFICATION,
        partyModificationType: {
            partyModificationType: PartyModificationTypeEnum.ContractorModificationUnit,
            ...modification,
        },
    };
}

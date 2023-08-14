import {
    ContractorModification,
    ContractorType,
    LegalEntityType,
    PartyModification,
} from '@vality/swag-claim-management';

import { createBaseContractorModification } from './create-base-contractor-modification';

export function createContractorLegalEntityModification(
    id: string,
    entity: LegalEntityType,
): PartyModification {
    return {
        ...createBaseContractorModification({
            id,
            modification: {
                contractorModificationType:
                    ContractorModification.ContractorModificationTypeEnum.Contractor,
                contractorType: {
                    contractorType: ContractorType.ContractorTypeEnum.LegalEntity,
                    legalEntityType: {
                        ...entity,
                    },
                } as ContractorType,
            } as ContractorModification,
        }),
    };
}

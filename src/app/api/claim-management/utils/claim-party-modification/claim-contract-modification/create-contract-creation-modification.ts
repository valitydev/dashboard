import {
    ContractCreationModification,
    ContractModification,
    PartyModification,
} from '@vality/swag-claim-management';

import { createBaseContractModification } from './create-base-contract-modification';

export function createContractCreationModification(
    id: string,
    params: Omit<ContractCreationModification, 'contractModificationType'>,
): PartyModification {
    return {
        ...createBaseContractModification({
            id,
            modification: {
                contractModificationType:
                    ContractModification.ContractModificationTypeEnum.ContractCreationModification,
                ...params,
            },
        }),
    };
}

export function createTestContractCreationModification(
    id: string,
    contractorID: string,
): PartyModification {
    return createContractCreationModification(id, {
        contractorID,
    });
}

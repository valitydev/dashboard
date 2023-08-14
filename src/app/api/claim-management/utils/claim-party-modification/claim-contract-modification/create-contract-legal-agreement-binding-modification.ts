import {
    ContractLegalAgreementBindingModification,
    ContractModification,
    LegalAgreement,
} from '@vality/swag-claim-management';

import { createBaseContractModification } from './create-base-contract-modification';

export const createContractLegalAgreementBindingModification = (
    id: string,
    legalAgreement: LegalAgreement,
) =>
    createBaseContractModification({
        id,
        modification: {
            contractModificationType:
                ContractModification.ContractModificationTypeEnum
                    .ContractLegalAgreementBindingModification,
            legalAgreement,
        } as ContractLegalAgreementBindingModification,
    });

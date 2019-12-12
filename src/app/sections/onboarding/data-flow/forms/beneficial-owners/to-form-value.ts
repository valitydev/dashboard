import get from 'lodash.get';

import { QuestionaryData, Contractor, BeneficialOwner } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { toRussianDomesticPassport, toResidencyInfo, toPdlInfo } from '../subforms';

const extractBeneficialOwner = (c: Contractor): BeneficialOwner[] => {
    switch (get(c, ['contractorType'])) {
        case 'IndividualEntityContractor':
            return get(c, ['individualEntity', 'beneficialOwners'], []);
        case 'LegalEntityContractor':
            return get(c, ['legalEntity', 'beneficialOwner'], []);
    }
};

const extractEntity = (c: Contractor): BeneficialOwner[] => {
    switch (get(c, ['contractorType'])) {
        case 'IndividualEntityContractor':
            return get(c, ['individualEntity']);
        case 'LegalEntityContractor':
            return get(c, ['legalEntity']);
    }
};

export const toFormValue = (d: QuestionaryData): FormValue => {
    const contractor = get(d, ['contractor']);
    return {
        noOwners: !get(extractEntity(contractor), ['hasBeneficialOwners'], true),
        beneficialOwners: extractBeneficialOwner(contractor).map(owner => ({
            ownershipPercentage: get(owner, ['ownershipPercentage'], null),
            privateEntityInfo: {
                birthDate: get(owner, ['russianPrivateEntity', 'birthDate'], null),
                birthPlace: get(owner, ['russianPrivateEntity', 'birthPlace'], null),
                residenceAddress: get(owner, ['russianPrivateEntity', 'residenceAddress'], null),
                fio: get(owner, ['russianPrivateEntity', 'fio'], null),
                snils: get(owner, ['snils'], null),
                innfl: get(owner, ['inn'], null)
            },
            russianDomesticPassport: toRussianDomesticPassport(get(owner, ['identityDocument'], null)),
            pdlInfo: toPdlInfo(owner),
            individualResidencyInfo: toResidencyInfo(get(owner, ['residencyInfo']))
        }))
    };
};
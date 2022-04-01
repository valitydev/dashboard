import { ModificationUnit, DocumentModificationUnit } from '@vality/swag-claim-management';

import { isClaimModification, isDocumentModificationUnit } from '../type-guards';

export const takeDocumentModificationUnits = (changeset: ModificationUnit[]): DocumentModificationUnit[] =>
    changeset.reduce(
        (acc, { modification }) =>
            isClaimModification(modification) && isDocumentModificationUnit(modification.claimModificationType)
                ? acc.concat(modification.claimModificationType)
                : acc,
        [] as DocumentModificationUnit[]
    );

import {
    ModificationUnit,
    FileModification,
    FileModificationUnit,
} from '@vality/swag-claim-management';

import { sortUnitsByCreatedAtAsc } from './sort-units';
import { isClaimModification, isFileModificationUnit } from './type-guards';

export const takeFileModificationUnits = (changeset: ModificationUnit[]): FileModificationUnit[] =>
    changeset.sort(sortUnitsByCreatedAtAsc).reduce((acc, { modification }) => {
        if (
            isClaimModification(modification) &&
            isFileModificationUnit(modification.claimModificationType)
        ) {
            const m = modification.claimModificationType;
            if (
                m.fileModification.fileModificationType ===
                FileModification.FileModificationTypeEnum.FileCreated
            ) {
                return acc.concat(m);
            } else if (
                m.fileModification.fileModificationType ===
                FileModification.FileModificationTypeEnum.FileDeleted
            ) {
                return acc.filter(({ fileId }) => fileId !== m.fileId);
            }
        }
        return acc;
    }, [] as FileModificationUnit[]);

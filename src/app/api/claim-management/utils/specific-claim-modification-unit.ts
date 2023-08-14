import {
    ClaimModification,
    ClaimModificationType,
    Modification,
} from '@vality/swag-claim-management';
import { Overwrite } from 'utility-types';

export type SpecificClaimModificationUnit<M extends ClaimModificationType = ClaimModificationType> =
    Overwrite<
        ClaimModification,
        {
            modificationType: typeof Modification.ModificationTypeEnum.ClaimModification;
            claimModificationType: M;
        }
    >;

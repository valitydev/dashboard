import { Modification, ModificationUnit } from '@vality/swag-claim-management';
import { Overwrite } from 'utility-types';

export type SpecificModificationUnit<M extends Modification = Modification> = Overwrite<
    ModificationUnit,
    { modification: M }
>;

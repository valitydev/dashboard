import { ModificationUnit } from '@vality/swag-claim-management';
import moment from 'moment';

export const sortUnitsByCreatedAtAsc = (
    { createdAt: a }: ModificationUnit,
    { createdAt: b }: ModificationUnit,
): number => moment(a).diff(moment(b));

import { PayoutParams } from '@vality/swag-payments';
import { v4 as uuid } from 'uuid';

import { toMinor } from '../../../../../utils';

export const toPayoutParams = ({ shopID, payoutToolID, amount }: any, currency: string): PayoutParams => {
    return {
        id: uuid(),
        shopID,
        payoutToolID,
        amount: toMinor(amount),
        currency,
    };
};

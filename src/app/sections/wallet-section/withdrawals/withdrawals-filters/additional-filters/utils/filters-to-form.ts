import { isNumber } from '@dsh/app/shared/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../types';

export const filtersToForm = ({
    withdrawalID = null,
    walletID = null,
    identityID = null,
    destinationID = null,
    status = null,
    amountFrom = null,
    amountTo = null,
}: AdditionalFilters): AdditionalFiltersForm => ({
    mainInfo: {
        withdrawalID,
        walletID,
        identityID,
        destinationID,
    },
    status,
    amount: {
        amountFrom: isNumber(amountFrom) ? amountFrom : null,
        amountTo: isNumber(amountTo) ? amountTo : null,
    },
});

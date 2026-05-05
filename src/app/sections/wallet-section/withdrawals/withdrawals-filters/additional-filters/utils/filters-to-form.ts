import { isNumber } from 'lodash-es';

import { AdditionalFilters, AdditionalFiltersForm } from '../types';

export const filtersToForm = ({
    withdrawalID = null,
    walletID = null,
    destinationID = null,
    status = null,
    amountFrom = null,
    amountTo = null,
}: AdditionalFilters): AdditionalFiltersForm => ({
    mainInfo: {
        withdrawalID,
        walletID,
        destinationID,
    },
    status,
    amount: {
        amountFrom: isNumber(amountFrom) ? amountFrom : null,
        amountTo: isNumber(amountTo) ? amountTo : null,
    },
});

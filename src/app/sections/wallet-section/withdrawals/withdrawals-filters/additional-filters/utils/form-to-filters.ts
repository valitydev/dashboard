import { isNumber } from '@dsh/app/shared/utils';
import { removeDictEmptyFields } from '@dsh/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../types';

export const formToFilters = ({
    mainInfo,
    status,
    amount,
}: AdditionalFiltersForm): AdditionalFilters =>
    removeDictEmptyFields({
        ...mainInfo,
        status,
        amountFrom: isNumber(amount?.amountFrom) ? amount.amountFrom : null,
        amountTo: isNumber(amount?.amountTo) ? amount.amountTo : null,
    });

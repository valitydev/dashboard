import { Params } from '@angular/router';
import isEmpty from 'lodash.isempty';
import isString from 'lodash.isstring';
import pickBy from 'lodash.pickby';

import { wrapValuesToArray } from '@dsh/utils';

import { PaymentsFiltersData } from '../types/payments-filters-data';

const LIST_FILTERS_KEYS = ['shopIDs', 'invoiceIDs'];

export function getListFiltersDataFromParams(params: Params): Partial<PaymentsFiltersData> {
    const nonEmptyListParams = pickBy(
        params,
        (value: unknown, key: keyof PaymentsFiltersData) => LIST_FILTERS_KEYS.includes(key) && !isEmpty(value)
    );
    const stringListParams = pickBy(nonEmptyListParams, (value: unknown) => isString(value));

    return {
        ...nonEmptyListParams,
        ...wrapValuesToArray(stringListParams),
    };
}
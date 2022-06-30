import isNil from 'lodash-es/isNil';
import round from 'lodash-es/round';

import { getCurrencyExponent } from './get-currency-exponent';

export const toMajor = (amount: number, currencyCode: string = 'USD'): number =>
    isNil(amount) ? null : round(amount / 10 ** getCurrencyExponent(currencyCode), getCurrencyExponent(currencyCode));

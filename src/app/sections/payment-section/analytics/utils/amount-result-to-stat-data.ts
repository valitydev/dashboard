import { AmountResult } from '@vality/swag-anapi-v2';

import { StatData } from './stat-data';

export function amountResultToStatData([current, previous]: AmountResult[][]): StatData[] {
    current ??= [];
    previous ??= [];
    const allCurrencies = current.concat(previous).map((c) => c.currency);
    const currencies = [...new Set(allCurrencies)];
    return currencies.map((currency) => ({
        current: current.find((c) => c.currency === currency)?.amount,
        currency,
        previous: previous.find((p) => p.currency === currency)?.amount,
    }));
}

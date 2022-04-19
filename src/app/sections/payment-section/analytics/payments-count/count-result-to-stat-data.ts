import { CountResult } from '@vality/swag-anapi-v2';

import { StatData } from '../utils';

export function countResultToStatData([current, previous]: CountResult[][]): StatData[] {
    current ??= [];
    previous ??= [];
    const allCurrencies = current.concat(previous).map((c) => c.currency);
    const currencies = [...new Set(allCurrencies)];
    return currencies.map((currency) => ({
        current: current.find((c) => c.currency === currency)?.count,
        currency,
        previous: previous.find((p) => p.currency === currency)?.count,
    }));
}

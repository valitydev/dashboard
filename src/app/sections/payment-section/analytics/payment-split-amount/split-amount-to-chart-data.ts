import { toMajor } from '@vality/ng-core';
import { OffsetAmount, SplitAmountResult, SplitUnit } from '@vality/swag-anapi-v2';
import moment from 'moment';

import { ChartData, Series, splitUnitToTimeFormat } from '../utils';

const indexToVisibility = (index: number, length: number): 'show' | 'hide' =>
    length > 24 ? (index % 2 ? 'hide' : 'show') : 'show';

const offsetToX = (offset: number, unit: SplitUnit, index: number, length: number): string =>
    `${moment(offset).format(splitUnitToTimeFormat(unit))}#${indexToVisibility(index, length)}`;

const offsetAmountsToSeries = (
    offsetAmounts: OffsetAmount[],
    currency: string,
    unit: SplitUnit,
): Series[] => [
    {
        data: offsetAmounts.map((offsetAmount, i) => ({
            x: offsetToX(offsetAmount.offset, unit, i, offsetAmounts.length),
            y: toMajor(offsetAmount.amount, currency),
        })),
    },
];

export const splitAmountToChartData = (
    paymentsSplitAmount: Array<SplitAmountResult>,
): ChartData[] =>
    paymentsSplitAmount.map(({ currency, offsetAmounts, splitUnit }) => ({
        currency,
        series: offsetAmountsToSeries(offsetAmounts, currency, splitUnit),
    }));

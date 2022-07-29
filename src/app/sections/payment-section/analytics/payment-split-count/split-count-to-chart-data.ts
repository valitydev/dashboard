import { SplitCountResult, SplitUnit, StatusOffsetCount } from '@vality/swag-anapi-v2';
import sortBy from 'lodash-es/sortBy';
import moment from 'moment';

import { ChartData, splitUnitToTimeFormat, Series } from '../utils';

const prepareOffsetCounts = (statusOffsetCounts: StatusOffsetCount[]): StatusOffsetCount[] =>
    statusOffsetCounts.map((statusOffsetCount): StatusOffsetCount => {
        const sorted = sortBy(statusOffsetCount.offsetCount, 'offset');
        return {
            ...statusOffsetCount,
            offsetCount: sorted,
        };
    });

const indexToVisibility = (index: number, length: number): 'show' | 'hide' =>
    length > 24 ? (index % 2 ? 'hide' : 'show') : 'show';

const offsetToX = (offset: number, unit: SplitUnit, index: number, length: number): string =>
    `${moment(offset).format(splitUnitToTimeFormat(unit))}#${indexToVisibility(index, length)}`;

const statusOffsetCountsToSeries = (
    statusOffsetCounts: StatusOffsetCount[],
    unit: SplitUnit,
    paymentStatusLabels: Record<StatusOffsetCount['status'], string>
): Series[] => {
    return statusOffsetCounts.map(({ status, offsetCount }) => ({
        name: paymentStatusLabels[status],
        data: offsetCount.map((c, i) => ({
            x: offsetToX(c.offset, unit, i, offsetCount.length),
            y: c.count,
        })),
    }));
};

export const splitCountToChartData = (
    splitCounts: SplitCountResult[],
    paymentStatusLabels: Record<StatusOffsetCount['status'], string>
): ChartData[] =>
    splitCounts.map(({ currency, statusOffsetCounts, splitUnit }) => {
        const prepared = prepareOffsetCounts(statusOffsetCounts);
        return {
            currency,
            series: statusOffsetCountsToSeries(prepared, splitUnit, paymentStatusLabels),
        };
    });

import { PaymentsToolDistributionResult } from '@vality/swag-anapi-v2';
import sortBy from 'lodash-es/sortBy';

import { DistributionChartData } from '../utils';

const sortByPercents = (distribution: PaymentsToolDistributionResult[]) => sortBy(distribution, (d) => -d.percents);

const getSeries = (distribution: PaymentsToolDistributionResult[]): number[] => distribution.map((d) => d.percents);

export const paymentsToolDistributionToChartData = (
    distribution: PaymentsToolDistributionResult[],
    paymentToolLabels: Record<PaymentsToolDistributionResult['name'], string>
): DistributionChartData => {
    const sorted = sortByPercents(distribution);
    return {
        series: getSeries(sorted),
        labels: distribution?.map((d) => paymentToolLabels[d.name]),
    };
};

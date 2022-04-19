import { translate } from '@ngneat/transloco';
import { PaymentsToolDistributionResult } from '@vality/swag-anapi-v2';
import sortBy from 'lodash-es/sortBy';

import { DistributionChartData } from '../utils';

const sortByPercents = (distribution: PaymentsToolDistributionResult[]) => sortBy(distribution, (d) => -d.percents);

const getSeries = (distribution: PaymentsToolDistributionResult[]): number[] => distribution.map((d) => d.percents);

const getLabels = (distribution: PaymentsToolDistributionResult[]): string[] =>
    translate(
        distribution.map((d) => `analytics.paymentToolsList.${d.name}`),
        null,
        'payment-section'
    );

export const paymentsToolDistributionToChartData = (
    distribution: PaymentsToolDistributionResult[]
): DistributionChartData => {
    const sorted = sortByPercents(distribution);
    return {
        series: getSeries(sorted),
        labels: getLabels(sorted),
    };
};

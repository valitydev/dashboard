import { ErrorDistribution } from './error-distribution';
import { DistributionChartData } from '../utils';

const errorsToSeries = (errors: ErrorDistribution[]): number[] => {
    const sum = errors.reduce((acc, curr) => acc + curr.percents, 0);
    const multiplier = 100 / sum;
    return errors.map((d) => d.percents * multiplier);
};

export const errorsDistributionToChartData = (
    distribution: ErrorDistribution[],
    errorLabels: Record<string, string>,
): DistributionChartData => {
    const filtered = distribution.filter((e) => e.percents > 0);
    return {
        series: errorsToSeries(filtered),
        labels: filtered.map(({ errorCode }) => errorLabels[errorCode]),
    };
};

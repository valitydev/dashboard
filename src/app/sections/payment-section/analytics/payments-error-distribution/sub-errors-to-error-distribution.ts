import { PaymentsSubErrorsDistributionResult } from '@vality/swag-anapi-v2';
import { SubError } from '@vality/swag-payments';

import { ErrorDistribution } from './error-distribution';
import { KNOWN_ERRORS } from './known-errors';

function getDistributionErrorCode(errorCode: string): ErrorDistribution['errorCode'] {
    return KNOWN_ERRORS.includes(errorCode as (typeof KNOWN_ERRORS)[number])
        ? (errorCode as (typeof KNOWN_ERRORS)[number])
        : 'other';
}

const subErrorToDistribution = (error: SubError, percents: number): ErrorDistribution => ({
    errorCode: getDistributionErrorCode(error.code),
    subErrors: error.subError ? [subErrorToDistribution(error.subError, percents)] : [],
    percents,
});

const groupDistribution = (distribution: ErrorDistribution[]): ErrorDistribution[] =>
    distribution.reduce((acc: ErrorDistribution[], curr) => {
        const index = acc.findIndex((a) => a.errorCode === curr.errorCode);
        const error = acc[index];
        let newAcc;
        if (error) {
            const updated = acc.filter((_, i) => i !== index);
            updated.push({
                errorCode: error.errorCode,
                percents: error.percents + curr.percents,
                subErrors: groupDistribution(error.subErrors.concat(curr.subErrors)),
            });
            newAcc = updated;
        } else {
            newAcc = acc.concat(curr);
        }
        return newAcc;
    }, []);

export const subErrorsToErrorDistribution = (
    errors: PaymentsSubErrorsDistributionResult[],
): ErrorDistribution[] => {
    const errorDistribution: ErrorDistribution[] = (errors ?? []).map(({ error, percents }) => ({
        errorCode: getDistributionErrorCode(error.code),
        subErrors: error.subError ? [subErrorToDistribution(error.subError, percents)] : [],
        percents,
    }));
    return groupDistribution(errorDistribution);
};

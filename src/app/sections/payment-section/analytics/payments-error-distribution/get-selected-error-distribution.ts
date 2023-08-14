import { ErrorDistribution } from './error-distribution';

export const getSelectedErrorDistribution = (
    errors: ErrorDistribution[],
    selectedSubErrorPath: number[],
): ErrorDistribution => {
    if (!selectedSubErrorPath.length) {
        return {
            errorCode: undefined,
            percents: undefined,
            subErrors: errors,
        };
    }
    let subError = errors[selectedSubErrorPath[0]];
    for (let i = 1; i < selectedSubErrorPath.length; ++i) {
        subError = subError.subErrors[selectedSubErrorPath[i]];
    }
    return subError;
};

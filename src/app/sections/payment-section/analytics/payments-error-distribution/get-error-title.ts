import { translate } from '@ngneat/transloco';

export const getErrorTitle = (errorCode: string): string => {
    if (!errorCode) return null;
    return translate(`analytics.errorCodes.${errorCode}`, null, 'payment-section');
};

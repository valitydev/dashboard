import { KNOWN_ERRORS } from './known-errors';

export interface ErrorDistribution {
    errorCode: typeof KNOWN_ERRORS[number] | 'other';
    percents: number;
    subErrors: ErrorDistribution[];
}

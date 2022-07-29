import { ClaimStatusesEnum } from './claim-statuses-enum';

export const OPTION_LABELS: { [N in ClaimStatusesEnum]: string } = {
    pending: 'pending',
    review: 'review',
    accepted: 'accepted',
    denied: 'denied',
    revoked: 'revoked',
};

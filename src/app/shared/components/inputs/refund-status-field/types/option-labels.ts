import { RefundStatus } from '@vality/swag-anapi-v2';

export const OPTION_LABELS: Record<RefundStatus.StatusEnum, string> = {
    succeeded: 'succeeded',
    failed: 'failed',
    pending: 'pending',
};

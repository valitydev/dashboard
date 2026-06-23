import { InvoiceStatus } from '@vality/swag-anapi-v2';

export const OPTION_LABELS: Record<InvoiceStatus.StatusEnum, unknown> = {
    paid: 'paid',
    cancelled: 'cancelled',
    fulfilled: 'fulfilled',
    unpaid: 'unpaid',
};

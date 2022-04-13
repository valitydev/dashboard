import { InvoiceStatus } from '@vality/swag-anapi-v2';

export const OPTION_LABELS: { [N in InvoiceStatus.StatusEnum] } = {
    paid: 'paid',
    cancelled: 'cancelled',
    fulfilled: 'fulfilled',
    unpaid: 'unpaid',
};

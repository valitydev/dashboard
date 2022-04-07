import { Reason } from '@vality/swag-payments';

export interface FulfillInvoiceParams {
    invoiceID: string;
    reason: Reason;
}

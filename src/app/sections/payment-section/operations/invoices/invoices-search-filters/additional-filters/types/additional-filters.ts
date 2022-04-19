import { InvoiceStatus } from '@vality/swag-anapi-v2';

export interface AdditionalFilters {
    invoiceIDs?: string[];
    shopIDs?: string[];
    invoiceStatus?: InvoiceStatus.StatusEnum;
}

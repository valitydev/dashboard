import { RefundStatus } from '@vality/swag-anapi-v2';

export interface AdditionalFilters {
    invoiceIDs?: string[];
    shopIDs?: string[];
    refundStatus?: RefundStatus.StatusEnum;
}

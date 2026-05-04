import { PaymentInstitution, Refund } from '@vality/swag-payments';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchFiltersParams {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    invoiceIDs?: string[];
    shopIDs?: string[];
    refundStatus?: Refund.StatusEnum;
}

import { PaymentInstitution } from '@vality/swag-payments';

import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchFiltersParams {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    invoiceIDs?: string[];
    shopIDs?: string[];
    invoiceStatus?: Invoice.StatusEnum;
}

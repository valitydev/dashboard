import { PaymentInstitution } from '@vality/swag-payments';

export interface SearchParams {
    fromTime: string;
    toTime: string;
    currency: string;
    realm: PaymentInstitution.RealmEnum;
    shopIDs?: string[];
}

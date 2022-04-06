import { PaymentInstitution } from '@vality/swag-payments';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchParams {
    fromTime: string;
    toTime: string;
    realm: RealmEnum;
    shopIDs?: string[];
}

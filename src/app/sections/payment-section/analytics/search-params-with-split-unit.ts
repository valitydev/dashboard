import { SplitUnit } from '@vality/swag-anapi-v2';
import { PaymentInstitution } from '@vality/swag-payments';

export interface SearchParamsWithSplitUnit {
    fromTime: string;
    toTime: string;
    splitUnit: SplitUnit;
    shopIDs?: string[];
    realm: PaymentInstitution.RealmEnum;
}

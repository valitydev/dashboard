import { PaymentInstitution } from '@vality/swag-payments';

export interface DistributionSearchParams {
    fromTime: string;
    toTime: string;
    shopIDs?: string[];
    realm: PaymentInstitution.RealmEnum;
}

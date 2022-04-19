import { Report } from '@vality/swag-anapi-v2';
import { PaymentInstitution } from '@vality/swag-payments';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchFiltersParams {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    reportTypes?: Report.ReportTypeEnum[];
}

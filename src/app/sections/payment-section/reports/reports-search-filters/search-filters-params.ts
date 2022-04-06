import { PaymentInstitution } from '@vality/swag-payments';

import { Report } from '@dsh/api-codegen/anapi';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchFiltersParams {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    reportTypes?: Report.ReportTypeEnum[];
}

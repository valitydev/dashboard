import { PaymentInstitution } from '@vality/swag-payments';

import { Report } from '@dsh/api-codegen/anapi';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    limit: number;
    reportTypes: Report.ReportTypeEnum[];
    paymentInstitutionRealm?: RealmEnum;
    shopIDs?: string[];
    continuationToken?: string;
}

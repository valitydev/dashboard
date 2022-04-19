import { Report } from '@vality/swag-anapi-v2';

export const OPTION_LABELS: { [N in Report.ReportTypeEnum]: string } = {
    provisionOfService: 'provisionOfService',
    paymentRegistry: 'paymentRegistry',
    paymentRegistryByPayout: 'paymentRegistryByPayout',
};

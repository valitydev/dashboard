import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { InvoicesFilterForm } from '../invoices-filter';
import { ShopsFilterForm } from '../shops-filter';

export type FloatingFilters = Partial<InvoicesFilterForm> &
    Partial<ShopsFilterForm> & {
        paymentStatus?: SearchPaymentsRequestParams['paymentStatus'];
    };

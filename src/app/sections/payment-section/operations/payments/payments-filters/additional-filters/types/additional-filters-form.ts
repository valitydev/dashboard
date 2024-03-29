import { PaymentStatus, SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { CardFilterForm } from '../card-filter';
import { InvoicesFilterForm } from '../invoices-filter';
import { MainFiltersForm } from '../main-filters';
import { PaymentSumFilterForm } from '../payment-sum-filter';
import { ShopsFilterForm } from '../shops-filter';

export interface AdditionalFiltersForm {
    main: MainFiltersForm;
    paymentStatus: PaymentStatus.StatusEnum;
    paymentSum: PaymentSumFilterForm;
    tokenProvider: SearchPaymentsRequestParams['bankCardTokenProvider'];
    paymentSystem: SearchPaymentsRequestParams['bankCardPaymentSystem'];
    invoices: InvoicesFilterForm;
    shops: ShopsFilterForm;
    binPan: CardFilterForm;
}

import { PaymentStatus, BankCardPaymentSystem, BankCardTokenProvider } from '@vality/swag-anapi-v2';

import { CardFilterForm } from '../card-filter';
import { InvoicesFilterForm } from '../invoices-filter';
import { MainFiltersForm } from '../main-filters';
import { PaymentSumFilterForm } from '../payment-sum-filter';
import { ShopsFilterForm } from '../shops-filter';

export type AdditionalFilters = Partial<MainFiltersForm> &
    Partial<PaymentSumFilterForm> &
    Partial<InvoicesFilterForm> &
    Partial<ShopsFilterForm> &
    Partial<CardFilterForm> & {
        binPan?: CardFilterForm;
        paymentStatus?: PaymentStatus.StatusEnum;
        tokenProvider?: BankCardTokenProvider;
        paymentSystem?: BankCardPaymentSystem;
    };

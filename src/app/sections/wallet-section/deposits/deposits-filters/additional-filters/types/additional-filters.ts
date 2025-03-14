import { DepositStatus } from '@vality/swag-wallets';

import { MainInfoFilters } from '../main-info-filters';

import { DepositAmountFilterData } from './deposit-amount-filter-data';

export type AdditionalFilters = Partial<MainInfoFilters> &
    Partial<DepositAmountFilterData> & {
        depositStatus?: DepositStatus.StatusEnum;
    };

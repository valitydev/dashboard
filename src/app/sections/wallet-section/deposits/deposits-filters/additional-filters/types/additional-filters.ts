import { DepositStatus } from '@vality/swag-wallet';

import { DepositAmountFilterData } from './deposit-amount-filter-data';
import { MainInfoFilters } from '../main-info-filters';

export type AdditionalFilters = Partial<MainInfoFilters> &
    Partial<DepositAmountFilterData> & {
        depositStatus?: DepositStatus.StatusEnum;
    };

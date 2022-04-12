import { WithdrawalStatus } from '@vality/swag-wallet';

import { MainInfoForm } from '../main-info-filters';
import { WithdrawalAmountForm } from '../withdrawal-sum-filter';

export type AdditionalFilters = MainInfoForm & { status?: WithdrawalStatus.StatusEnum } & WithdrawalAmountForm;

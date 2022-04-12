import { ListDepositsRequestParams } from '@vality/swag-wallet/lib/api/deposits.service';

import { DepositsFilters } from '../deposits-filters/types/deposits-filters';

export const filtersToSearchParams = ({
    dateRange,
    depositAmountFrom,
    depositID,
    depositStatus,
    depositAmountTo,
    sourceID,
    walletID,
    identityID,
}: DepositsFilters): Omit<ListDepositsRequestParams, 'xRequestID' | 'limit'> => ({
    createdAtFrom: dateRange.start.utc().format(),
    createdAtTo: dateRange.end.utc().format(),
    walletID,
    identityID,
    sourceID,
    depositID,
    status: depositStatus,
    amountFrom: depositAmountFrom,
    amountTo: depositAmountTo,
});

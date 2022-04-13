import { GetPaymentsSplitCountRequestParams } from '@vality/swag-anapi-v2';
import moment from 'moment';

import { SearchParams } from '../search-params';
import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';

export const searchParamsToParamsWithSplitUnit = ({
    fromTime,
    toTime,
    shopIDs,
    realm,
}: SearchParams): SearchParamsWithSplitUnit => ({
    fromTime,
    toTime,
    splitUnit: calculateSplitUnit(fromTime, toTime),
    shopIDs,
    realm,
});

const calculateSplitUnit = (fromTime: string, toTime: string): GetPaymentsSplitCountRequestParams['splitUnit'] => {
    const daysCount = Math.abs(moment(fromTime).diff(toTime, 'd'));
    if (daysCount > 90) {
        return 'month';
    }
    if (daysCount > 35) {
        return 'week';
    }
    if (daysCount > 1) {
        return 'day';
    }
    return 'hour';
};

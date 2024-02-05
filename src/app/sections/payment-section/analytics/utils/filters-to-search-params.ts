import { PaymentInstitution } from '@vality/swag-payments';
import moment from 'moment';

import { Preset } from '@dsh/components/date-range-filter';

import { Filters } from '../analytics-search-filters/analytics-search-filters.component';
import { SearchParams } from '../search-params';

export const filtersToSearchParams = (
    { dateRange, ...otherParams }: Filters,
    realm: PaymentInstitution.RealmEnum,
): SearchParams => {
    const { start, end } = dateRange;
    return {
        fromTime: start.clone().utc().format(),
        toTime: end.clone().utc().format(),
        realm,
        ...otherParams,
    };
};

export const filtersToBarChartSearchParams = (
    { dateRange, ...otherParams }: Filters,
    realm: PaymentInstitution.RealmEnum,
): SearchParams => {
    const { start, end } = dateRange;
    return {
        fromTime:
            dateRange.preset === Preset.Last24hour
                ? start.clone().startOf('hour').utc().format()
                : start.clone().startOf('day').utc().format(),
        toTime:
            dateRange.preset === Preset.Last24hour
                ? moment().endOf('hour').utc().format()
                : end.clone().endOf('day').utc().format(),
        realm,
        ...otherParams,
    };
};

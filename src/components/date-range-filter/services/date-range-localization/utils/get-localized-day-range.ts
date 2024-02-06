import { DateRange } from '@angular/material/datepicker';
import { Moment } from 'moment';

import { capitalizeFirstLetter } from './capitilize-first-letter';
import { isCurrentYear } from './get-date-range-current-type';
import { isMonthsRange as getIsMonthsRange } from './get-date-range-type';
import { getLocalizedDate } from './get-localized-date';

/**
 * Январь
 * Январь 2020
 * 2 января
 * 2 января 2020
 *
 * Со 2 по 8 марта / Со 2 января по 8 марта
 * Со 2 по 8 марта 2019 / Со 2 января 2019 по 8 марта 2020
 */
export function getLocalizedDayRange(
    dateRange: DateRange<Moment>,
    t: Record<'from' | 'to' | 'fromStartWith2', string>,
    locale: string,
): string {
    const { start, end } = dateRange;
    const isMonthsRange = getIsMonthsRange(dateRange);
    const endStr = getLocalizedDate(
        end,
        { d: !isMonthsRange, m: true, y: !isCurrentYear(dateRange) },
        locale,
        isMonthsRange,
    );
    const isSameYear = start.isSame(end, 'year');
    const isSameYearMonth = isSameYear && start.isSame(end, 'month');
    if (isSameYearMonth && (start.isSame(end, 'day') || isMonthsRange)) {
        return capitalizeFirstLetter(endStr);
    }
    const startStr = getLocalizedDate(
        start,
        { d: !isMonthsRange, m: !isSameYearMonth, y: !isSameYear },
        locale,
    );
    return `${start.date() === 2 ? t.fromStartWith2 : t.from} ${startStr} ${t.to} ${endStr}`;
}

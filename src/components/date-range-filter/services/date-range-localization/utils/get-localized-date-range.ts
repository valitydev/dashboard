import { DateRange } from '@angular/material/datepicker';
import { Moment } from 'moment';

import { DateRangeTranslations } from '../types/translations';

import { isCurrentWeek, isToday } from './get-date-range-current-type';
import { isYearsRange } from './get-date-range-type';
import { getLocalizedDayRange } from './get-localized-day-range';
import { getLocalizedYearRange } from './get-localized-year-range';

export function getLocalizedDateRange(
    dateRange: DateRange<Moment>,
    t: DateRangeTranslations,
    locale: string,
): string {
    if (!dateRange.start && !dateRange.end) {
        return null;
    } else if (isYearsRange(dateRange)) {
        return getLocalizedYearRange(dateRange, t);
    } else if (isCurrentWeek(dateRange)) {
        return t.currentWeek;
    } else if (isToday(dateRange)) {
        return t.today;
    }
    return getLocalizedDayRange(dateRange, t, locale);
}

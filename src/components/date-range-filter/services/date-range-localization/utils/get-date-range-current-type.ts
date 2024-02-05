import { DateRange } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';

import { isDay, isYear } from './get-date-range-type';

export const isCurrentYear = (dateRange: DateRange<Moment>): boolean =>
    isYear(dateRange) && moment().isSame(dateRange.start, 'year');
export const isCurrentWeek = ({ start, end }: DateRange<Moment>): boolean =>
    start.isSame(moment().startOf('week'), 'day') && end.isSame(moment().endOf('week'), 'day');
export const isToday = (dateRange: DateRange<Moment>): boolean =>
    isDay(dateRange) && dateRange.start.isSame(moment(), 'day');

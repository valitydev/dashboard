import { DateRange } from '@angular/material/datepicker';
import { Moment } from 'moment';

export const isYearsRange = ({ start, end }: DateRange<Moment>): boolean =>
    start.isSame(start.clone().startOf('year'), 'day') &&
    end.isSame(end.clone().endOf('year'), 'day');
export const isYear = (dateRange: DateRange<Moment>): boolean =>
    isYearsRange(dateRange) && dateRange.start.isSame(dateRange.end, 'year');
export const isMonthsRange = ({ start, end }: DateRange<Moment>): boolean =>
    start.isSame(start.clone().startOf('month'), 'day') &&
    end.isSame(end.clone().endOf('month'), 'day');
export const isMonth = (dateRange: DateRange<Moment>): boolean =>
    isMonthsRange(dateRange) && dateRange.start.isSame(dateRange.end, 'month');
export const isDay = ({ start, end }: DateRange<Moment>): boolean => start.isSame(end, 'days');

import { DateRange } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';

export const isCurrentYear = (dateRange: DateRange<Moment>): boolean =>
    moment().isSame(dateRange.start, 'year') && moment().isSame(dateRange.end, 'year');
export const isCurrentWeek = ({ start, end }: DateRange<Moment>): boolean =>
    start.isSame(moment().startOf('week'), 'day') && end.isSame(moment().endOf('week'), 'day');
export const isToday = (dateRange: DateRange<Moment>): boolean =>
    dateRange.start.isSame(moment(), 'day') && dateRange.end.isSame(moment(), 'day');

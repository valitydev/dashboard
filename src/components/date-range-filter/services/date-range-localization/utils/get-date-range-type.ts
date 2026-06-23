import { Moment } from 'moment';

import { DateRange } from '@angular/material/datepicker';

export const isYearsRange = ({ start, end }: DateRange<Moment>): boolean =>
    start.isSame(start.clone().startOf('year'), 'day') &&
    end.isSame(end.clone().endOf('year'), 'day');
export const isMonthsRange = ({ start, end }: DateRange<Moment>): boolean =>
    start.isSame(start.clone().startOf('month'), 'day') &&
    end.isSame(end.clone().endOf('month'), 'day');

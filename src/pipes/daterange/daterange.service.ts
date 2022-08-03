import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Daterange, isDaterange } from './daterange';
import { isCurrentWeek, isCurrentYear, isToday } from './daterange-current-type';
import { isMonth, isMonthsRange, isYearsRange } from './daterange-type';

const WORDS = ['from', 'fromStartWith2', 'to', 'today', 'currentWeek', 'year'] as const;

@Injectable()
export class DaterangeService {
    private translations$ = this.transloco.selectTranslation('core-pipes').pipe(map(() => this.wordTranslates()));

    constructor(@Inject(LOCALE_ID) private locale: string, private transloco: TranslocoService) {}

    switchToDaterangeStr(daterange: Partial<Daterange>): Observable<string> {
        daterange = { begin: daterange?.begin?.local(), end: daterange?.end?.local() };
        if (!isDaterange(daterange)) {
            return of('');
        } else if (isYearsRange(daterange)) {
            return this.toYearStr(daterange);
        } else if (isMonthsRange(daterange)) {
            return this.toMonthStr(daterange);
        } else if (isCurrentWeek(daterange)) {
            return this.translations$.pipe(pluck('currentWeek'));
        } else if (isToday(daterange)) {
            return this.translations$.pipe(pluck('today'));
        }
        return this.toDateStr(daterange);
    }

    /**
     * 2020 год
     * С 2019 по 2020 год
     */
    toYearStr({ begin, end }: Daterange) {
        return this.translations$.pipe(
            map((t) => {
                const endStr = `${end.year()} ${t.year}`;
                if (begin.isSame(end, 'year')) {
                    return endStr;
                }
                return `${t.from} ${begin.year()} ${t.to} ${endStr}`;
            })
        );
    }

    /**
     * Январь
     * Январь 2020
     *
     * С января по март
     * С января 2019 по март 2019 / С декабря 2019 по март 2020
     */
    toMonthStr({ begin, end }: Daterange) {
        return this.translations$.pipe(
            map((t) => {
                const currentYear = isCurrentYear({ begin, end });
                const beginStr = this.formatDate(begin, false, true, !currentYear);
                const endStr = this.formatStandaloneDate(end, false, true, !currentYear);
                if (isMonth({ begin, end })) {
                    return this.capitalizeFirstLetter(endStr);
                }
                return `${t.from} ${beginStr} ${t.to} ${endStr}`;
            })
        );
    }

    /**
     * 2 января
     * 2 января 2020
     *
     * Со 2 по 8 марта / Со 2 января по 8 марта
     * Со 2 по 8 марта 2019 / Со 2 января 2019 по 8 марта 2020
     */
    toDateStr({ begin, end }: Daterange) {
        return this.translations$.pipe(
            map((t) => {
                const beginStr = this.formatDate(begin, true, !begin.isSame(end, 'month'), !begin.isSame(end, 'year'));
                const endStr = this.formatDate(end, true, true, !isCurrentYear({ begin, end }));
                if (begin.isSame(end, 'day')) {
                    return endStr;
                }
                return `${begin.date() === 2 ? t.fromStartWith2 : t.from} ${beginStr} ${t.to} ${endStr}`;
            })
        );
    }

    private capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private formatDate(date: Moment, d: boolean = false, m: boolean = false, y: boolean = false) {
        return formatDate(date.toDate(), [d && 'd', m && 'MMMM', y && 'y'].filter((v) => v).join(' '), this.locale);
    }

    private formatStandaloneDate(date: Moment, d: boolean = false, m: boolean = false, y: boolean = false) {
        return formatDate(date.toDate(), [d && 'd', m && 'LLLL', y && 'y'].filter((v) => v).join(' '), this.locale);
    }

    private wordTranslates(): Record<typeof WORDS[number], string> {
        return {
            from: this.transloco.translate('daterange.from', null, 'core-pipes'),
            fromStartWith2: this.transloco.translate('daterange.fromStartWith2', null, 'core-pipes'),
            to: this.transloco.translate('daterange.to', null, 'core-pipes'),
            today: this.transloco.translate('daterange.today', null, 'core-pipes'),
            currentWeek: this.transloco.translate('daterange.currentWeek', null, 'core-pipes'),
            year: this.transloco.translate('daterange.year', null, 'core-pipes'),
        };
    }
}

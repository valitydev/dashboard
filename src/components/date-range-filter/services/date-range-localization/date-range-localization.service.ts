import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { TranslocoService } from '@jsverse/transloco';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DATE_RANGE_WORDS } from './types/translations';
import { getLocalizedDateRange } from './utils/get-localized-date-range';

@Injectable()
export class DateRangeLocalizationService {
    private translations$ = this.transloco
        .selectTranslation('core-components')
        .pipe(map(() => this.getPartLabels()));

    constructor(
        @Inject(LOCALE_ID) private locale: string,
        private transloco: TranslocoService,
    ) {}

    getLocalizedString(dateRange: DateRange<Moment>): Observable<string> {
        return this.translations$.pipe(
            map((t) => getLocalizedDateRange(dateRange, t, this.locale)),
        );
    }

    private getPartLabels(): Record<(typeof DATE_RANGE_WORDS)[number], string> {
        return {
            today: this.transloco.translate('dateRangeFilter.part.today', null, 'core-components'),
            from: this.transloco.translate('dateRangeFilter.part.from', null, 'core-components'),
            fromStartWith2: this.transloco.translate(
                'dateRangeFilter.part.fromStartWith2',
                null,
                'core-components',
            ),
            to: this.transloco.translate('dateRangeFilter.part.to', null, 'core-components'),
            currentWeek: this.transloco.translate(
                'dateRangeFilter.part.currentWeek',
                null,
                'core-components',
            ),
            year: this.transloco.translate('dateRangeFilter.part.year', null, 'core-components'),
        };
    }
}

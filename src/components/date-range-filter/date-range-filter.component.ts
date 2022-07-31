import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { DateRange as MatDateRange } from '@angular/material/datepicker';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { provideValueAccessor } from '@s-libs/ng-core';
import { Moment } from 'moment';
import { switchMap } from 'rxjs/operators';

import { FilterSuperclass } from '@dsh/components/filter';

import { DateRangeLocalizationService } from './services/date-range-localization/date-range-localization.service';
import { DateRangeWithPreset } from './types/date-range-with-preset';
import { Preset } from './types/preset';
import { PRESETS_TRANSLATION_PATH } from './types/preset-translation-path';
import { Step } from './types/step';
import { createDateRangeByPreset } from './utils/create-date-range-by-preset';

type MatMomentDateRange = MatDateRange<Moment>;

type InnerDateRange = {
    dateRange: MatMomentDateRange;
    preset?: Preset;
};

@UntilDestroy()
@Component({
    selector: 'dsh-date-range-filter',
    templateUrl: 'date-range-filter.component.html',
    styleUrls: ['date-range-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(DateRangeFilterComponent), DateRangeLocalizationService],
})
export class DateRangeFilterComponent extends FilterSuperclass<InnerDateRange, DateRangeWithPreset> {
    @Input() default: Partial<DateRangeWithPreset> = { start: null, end: null };
    @Input() maxDate: Moment;

    step = Step.Presets;
    presets = PRESETS_TRANSLATION_PATH;
    activeLabel$ = this.savedValue$.pipe(
        switchMap(({ dateRange, preset }) => {
            if (!preset) return this.transloco.selectTranslate('label', null, 'date-range-filter');
            return preset === Preset.Custom
                ? this.dateRangeLocalizationService.getLocalizedString(dateRange)
                : this.transloco.selectTranslate(
                      `presets.${PRESETS_TRANSLATION_PATH.find(([id]) => id === preset)[1]}`,
                      null,
                      'date-range-filter'
                  );
        })
    );
    stepEnum = Step;

    protected get empty(): InnerDateRange {
        return { dateRange: new MatDateRange<Moment>(null, null) };
    }

    constructor(
        injector: Injector,
        private dateRangeLocalizationService: DateRangeLocalizationService,
        private transloco: TranslocoService
    ) {
        super(injector);
    }

    selectedChange(date: Moment): void {
        const {
            dateRange: { start, end },
        } = this.value;
        let newStart: Moment;
        let newEnd: Moment;
        if (start && !end) {
            if (start.isBefore(date)) {
                newStart = start;
                newEnd = date;
            } else {
                newStart = date;
                newEnd = start;
            }
        } else {
            newStart = date;
        }
        this.value = {
            dateRange: new MatDateRange(
                newStart?.local()?.startOf('day')?.utc(true),
                newEnd?.local()?.endOf('day')?.utc(true)
            ),
            preset: Preset.Custom,
        };
    }

    selectPreset(preset: Preset): void {
        if (preset === Preset.Custom) {
            this.step = Step.Calendar;
            return;
        }
        const { start, end } = createDateRangeByPreset(preset);
        this.value = { dateRange: new MatDateRange(start, end), preset };
    }

    save(value = this.control.value): void {
        if (!value.dateRange.start || !value.dateRange.end) {
            this.clear();
            value = this.control.value;
        }
        this.step = Step.Presets;
        this.set(value);
    }

    clear(): void {
        this.control.setValue(this.outerToInnerValue(this.default));
    }

    protected innerToOuterValue({ dateRange: { start, end }, preset }: InnerDateRange): DateRangeWithPreset {
        return { start, end, preset };
    }

    protected outerToInnerValue(dateRange: Partial<DateRangeWithPreset>): InnerDateRange {
        if (dateRange?.preset && dateRange.preset !== Preset.Custom) {
            const { start, end } = createDateRangeByPreset(dateRange.preset);
            return { dateRange: new MatDateRange(start, end), preset: dateRange.preset };
        }
        if (!dateRange?.start || !dateRange?.end) return this.empty;
        return { dateRange: new MatDateRange(dateRange.start, dateRange.end), preset: Preset.Custom };
    }
}

import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { DateRange as MatDateRange } from '@angular/material/datepicker';
import { TranslocoService } from '@jsverse/transloco';
import { createControlProviders, getValueChanges } from '@vality/matez';
import { Moment } from 'moment';
import { switchMap, map, shareReplay } from 'rxjs/operators';

import { FilterSuperclass } from '@dsh/components/filter';

import { DateRangeLocalizationService } from './services/date-range-localization/date-range-localization.service';
import { DateRangeWithPreset } from './types/date-range-with-preset';
import { Preset } from './types/preset';
import { Step } from './types/step';
import { createDateRangeByPreset } from './utils/create-date-range-by-preset';

type MatMomentDateRange = MatDateRange<Moment>;

type InnerDateRange = {
    dateRange: MatMomentDateRange;
    preset?: Preset;
};

@Component({
    selector: 'dsh-date-range-filter',
    templateUrl: 'date-range-filter.component.html',
    styleUrls: ['date-range-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ...createControlProviders(() => DateRangeFilterComponent),
        DateRangeLocalizationService,
    ],
    standalone: false,
})
export class DateRangeFilterComponent extends FilterSuperclass<
    InnerDateRange,
    DateRangeWithPreset
> {
    @Input() default: Partial<DateRangeWithPreset> = { start: null, end: null };
    @Input() maxDate: Moment;

    step = Step.Presets;
    presets: Preset[] = Object.values(Preset);
    activeLabel$ = this.savedValue$.pipe(
        switchMap(({ dateRange, preset }) => {
            if (!preset) {
                return this.transloco.selectTranslate(
                    'dateRangeFilter.label',
                    null,
                    'core-components',
                );
            }
            return preset === Preset.Custom
                ? this.dateRangeLocalizationService.getLocalizedString(dateRange)
                : this.presetLabels$.pipe(map((d) => d[preset]));
        }),
    );
    stepEnum = Step;
    presetLabels$ = this.transloco
        .selectTranslation('core-components')
        .pipe(map(() => this.getPresetLabels()));
    selectedCalendar$ = getValueChanges(this.control).pipe(
        map(
            ({ dateRange }) =>
                new MatDateRange(
                    dateRange.start?.clone?.()?.local?.(),
                    dateRange.end?.clone?.()?.local?.(),
                ),
        ),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    protected get empty(): InnerDateRange {
        return { dateRange: new MatDateRange<Moment>(null, null) };
    }

    constructor(
        injector: Injector,
        private dateRangeLocalizationService: DateRangeLocalizationService,
        private transloco: TranslocoService,
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
                newStart?.clone()?.startOf('day'),
                newEnd?.clone()?.endOf('day'),
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
        const { start, end } = value.dateRange;
        if (!start && !end) {
            this.clear();
            value = this.control.value;
        } else if (!start || !end) {
            const date = start || end;
            value = {
                dateRange: new MatDateRange(date.clone().startOf('day'), date.clone().endOf('day')),
                preset: Preset.Custom,
            };
            this.control.setValue(value);
        }
        this.step = Step.Presets;
        this.set(value);
    }

    clear(): void {
        this.control.setValue(this.outerToInnerValue(this.default));
    }

    protected innerToOuterValue({
        dateRange: { start, end },
        preset,
    }: InnerDateRange): DateRangeWithPreset {
        return { start, end, preset };
    }

    protected outerToInnerValue(dateRange: Partial<DateRangeWithPreset>): InnerDateRange {
        const { start, end } =
            dateRange?.preset && dateRange.preset !== Preset.Custom
                ? createDateRangeByPreset(dateRange.preset)
                : (dateRange ?? {});
        return start && end
            ? {
                  dateRange: new MatDateRange(start, end),
                  preset: dateRange?.preset ?? Preset.Custom,
              }
            : this.empty;
    }

    private getPresetLabels(): Record<Preset, string> {
        return {
            last24hour: this.transloco.translate(
                'dateRangeFilter.preset.last24hour',
                null,
                'core-components',
            ),
            last30days: this.transloco.translate(
                'dateRangeFilter.preset.last30days',
                null,
                'core-components',
            ),
            last90days: this.transloco.translate(
                'dateRangeFilter.preset.last90days',
                null,
                'core-components',
            ),
            last365days: this.transloco.translate(
                'dateRangeFilter.preset.last365days',
                null,
                'core-components',
            ),
            custom: this.transloco.translate(
                'dateRangeFilter.preset.custom',
                null,
                'core-components',
            ),
        };
    }
}

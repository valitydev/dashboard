import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as humanizeDuration from 'humanize-duration';
import { UnitTranslationOptions } from 'humanize-duration';
import moment from 'moment';
import { Observable, of, switchMap } from 'rxjs';
import { first, map, withLatestFrom } from 'rxjs/operators';

import { LanguageService } from '../language';

export type Value = number | string | moment.Moment | Date;

export interface HumanizeConfig extends humanizeDuration.HumanizerOptions {
    isShort?: boolean;
    hasAgoEnding?: boolean;
}

@Injectable()
export class HumanizeDurationService {
    /* eslint-disable @typescript-eslint/naming-convention */
    static HOUR_MS = 3600000;
    static MIN_HUMANIZE_DURATION_UPDATE_MS = 1000;
    static MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_MINUTE_UPDATES_MS = 20000;
    static MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_HOURLY_AND_LONGER_UPDATES_MS = 600000;
    static LESS_THAN_FEW_SECONDS = 3000;
    /* eslint-enable @typescript-eslint/naming-convention */

    private get duration() {
        return humanizeDuration.humanizer({
            language: this.languageService.active || 'en',
            round: true,
            delimiter: ' ',
        });
    }

    get shortEnglishHumanizer(): Observable<humanizeDuration.HumanizerOptions> {
        return this.getUnitLabels().pipe(
            map((unitLabels) => ({
                language: 'short',
                languages: {
                    short: unitLabels,
                },
            })),
        );
    }

    constructor(
        private languageService: LanguageService,
        private transloco: TranslocoService,
    ) {}

    getDiffMs(value: Value): number {
        return Math.abs(this.isDiff(value) ? value : moment().diff(moment(value)));
    }

    getDuration(value: Value, config: HumanizeConfig = {}): Observable<string> {
        const diffMs = this.getDiffMs(value);
        if (isNaN(diffMs)) return null;
        if (diffMs < HumanizeDurationService.LESS_THAN_FEW_SECONDS)
            return this.transloco.selectTranslate(
                'humanizeDuration.justNow',
                null,
                'core-components',
            );
        return of(this.duration(diffMs, config)).pipe(
            switchMap((duration) => {
                if (config.isShort)
                    return this.shortEnglishHumanizer.pipe(
                        map((shortEnglishHumanizer) =>
                            this.duration(diffMs, { ...config, ...shortEnglishHumanizer }),
                        ),
                    );
                if (config.largest === 1) return of(moment.duration(diffMs).humanize());
                return of(duration);
            }),
            map((duration) => (duration === 'минута' ? 'минуту' : duration)),
            withLatestFrom(
                this.transloco.selectTranslate('humanizeDuration.ago', null, 'core-components'),
            ),
            map(([duration, ago]) => (config.hasAgoEnding ? `${duration} ${ago}` : duration)),
        );
    }

    getOptimalUpdateInterval(value: Value, { largest }: HumanizeConfig): number {
        const diffMs = this.getDiffMs(value);
        if (diffMs < HumanizeDurationService.LESS_THAN_FEW_SECONDS) {
            return HumanizeDurationService.MIN_HUMANIZE_DURATION_UPDATE_MS;
        }
        if (largest === 1) {
            if (diffMs < HumanizeDurationService.HOUR_MS) {
                return HumanizeDurationService.MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_MINUTE_UPDATES_MS;
            }
            return HumanizeDurationService.MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_HOURLY_AND_LONGER_UPDATES_MS;
        }
        return HumanizeDurationService.MIN_HUMANIZE_DURATION_UPDATE_MS;
    }

    isDiff(value: Value): value is number {
        return typeof value === 'number';
    }

    private getUnitLabels(): Observable<UnitTranslationOptions> {
        return this.transloco.selectTranslation('core-components').pipe(
            first(),
            map(() => ({
                d: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.day',
                        null,
                        'core-components',
                    ),
                h: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.hour',
                        null,
                        'core-components',
                    ),
                ms: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.millisecond',
                        null,
                        'core-components',
                    ),
                m: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.minute',
                        null,
                        'core-components',
                    ),
                mo: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.month',
                        null,
                        'core-components',
                    ),
                s: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.second',
                        null,
                        'core-components',
                    ),
                w: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.week',
                        null,
                        'core-components',
                    ),
                y: () =>
                    this.transloco.translate(
                        'humanizeDuration.shortUnit.year',
                        null,
                        'core-components',
                    ),
            })),
        );
    }
}

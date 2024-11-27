import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { interval, Subscription, switchMap } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { HumanizeConfig, HumanizeDurationService, Value } from './humanize-duration.service';

export interface HumanizeDurationConfig extends HumanizeConfig {
    interval?: number;
}

@Pipe({ name: 'humanizedDuration', pure: false })
export class HumanizedDurationPipe implements OnDestroy, PipeTransform {
    private latestValue: string = '';
    private subscription: Subscription;
    private inputValue: Value;

    constructor(
        private humanizeDurationService: HumanizeDurationService,
        private ref: ChangeDetectorRef,
    ) {}

    transform(value: Value, { interval: inpIntervalMs, ...config }: HumanizeDurationConfig = {}) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            if (!this.humanizeDurationService.isDiff(value)) {
                this.dispose();
                this.subscription = interval(
                    inpIntervalMs ||
                        this.humanizeDurationService.getOptimalUpdateInterval(value, config),
                )
                    .pipe(
                        startWith(0),
                        switchMap(() => this.humanizeDurationService.getDuration(value, config)),
                    )
                    .subscribe((duration) => {
                        if (duration !== this.latestValue) {
                            this.ref.markForCheck();
                            this.latestValue = duration;
                        }
                    });
            }
        }
        return this.latestValue;
    }

    ngOnDestroy(): void {
        this.dispose();
    }

    private dispose(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

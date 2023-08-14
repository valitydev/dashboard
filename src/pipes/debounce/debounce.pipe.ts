import { ChangeDetectorRef, NgZone, Pipe, PipeTransform, OnDestroy } from '@angular/core';

const INIT_VALUE = Symbol();

@Pipe({ name: 'debounce', pure: false })
export class DebouncePipe<T> implements PipeTransform, OnDestroy {
    private currentValue: T | symbol = INIT_VALUE;
    private transformValue: T | symbol = INIT_VALUE;
    private timeout: number = -1;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private zone: NgZone,
    ) {}

    transform(value: T, debounceTime: number = 500): T {
        if (this.currentValue === INIT_VALUE) {
            this.currentValue = value;
            return value;
        }
        if (this.currentValue === value) {
            this.clear();
            return value;
        }
        if (this.transformValue !== value) {
            this.transformValue = value;
            this.clear();
            this.timeout = setTimeout(() => {
                this.zone.run(() => {
                    this.currentValue = this.transformValue;
                    this.transformValue = INIT_VALUE;
                    this.changeDetector.markForCheck();
                });
            }, debounceTime) as never;
        }
        return this.currentValue as T;
    }

    ngOnDestroy() {
        this.clear();
    }

    private clear() {
        clearTimeout(this.timeout);
    }
}

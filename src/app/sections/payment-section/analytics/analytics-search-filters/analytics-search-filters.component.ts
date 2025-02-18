import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    OnChanges,
    DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ComponentChanges } from '@vality/ng-core';
import { Shop } from '@vality/swag-payments';
import { combineLatest, defer, Observable } from 'rxjs';
import { first, map, pluck, shareReplay } from 'rxjs/operators';

import {
    createDateRangeWithPreset,
    DateRangeWithPreset,
    Preset,
} from '@dsh/components/date-range-filter';
import { getFormValueChanges } from '@dsh/utils';

import { RealmShopsService } from '../../services';

import { shopsToCurrencies } from './shops-to-currencies';

export interface Filters {
    shopIDs: Shop['id'][];
    dateRange: DateRangeWithPreset;
    currency: string;
}

@Component({
    selector: 'dsh-analytics-search-filters',
    templateUrl: 'analytics-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AnalyticsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Output() filterValuesChanged = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({
        shopIDs: null,
        dateRange: this.defaultDateRange,
        currency: null,
    });
    currencies$: Observable<string[]> = defer(() => this.shops$).pipe(map(shopsToCurrencies));
    shopsByCurrency$: Observable<Shop[]> = defer(() =>
        combineLatest([getFormValueChanges(this.form).pipe(pluck('currency')), this.shops$]),
    ).pipe(
        map(([currency, shops]) => shops.filter((shop) => shop.currency === currency)),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    private shops$ = this.realmShopsService.shops$;

    constructor(
        private fb: FormBuilder,
        private realmShopsService: RealmShopsService,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((filters) => this.filterValuesChanged.next(filters as unknown as Filters));
        this.currencies$.pipe(first(), takeUntilDestroyed(this.dr)).subscribe((currencies) => {
            if (!this.form.value.currency) {
                this.form.patchValue({
                    currency: currencies.includes('RUB') ? 'RUB' : currencies[0],
                });
            }
        });
    }

    ngOnChanges({ initParams }: ComponentChanges<AnalyticsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(initParams.currentValue as unknown);
        }
    }
}

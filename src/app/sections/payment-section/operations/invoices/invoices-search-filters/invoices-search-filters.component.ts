import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PaymentInstitution } from '@vality/swag-payments';
import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import { defer, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { ShopsDataService } from '@dsh/app/shared';
import {
    createDateRangeWithPreset,
    Preset,
    DateRangeWithPreset,
} from '@dsh/components/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { filterShopsByRealm } from '../../operators';

import { AdditionalFilters, DialogFiltersComponent } from './additional-filters';

import RealmEnum = PaymentInstitution.RealmEnum;

type MainFilters = {
    dateRange: DateRangeWithPreset;
};
export type Filters = MainFilters & AdditionalFilters;

const MAIN_FILTERS = ['dateRange'];
const ADDITIONAL_FILTERS = ['invoiceIDs', 'shopIDs', 'invoiceStatus'];

@UntilDestroy()
@Component({
    selector: 'dsh-invoices-search-filters',
    templateUrl: 'invoices-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesSearchFiltersComponent implements OnChanges, OnInit {
    @Input() initParams: Filters;
    @Input() realm: RealmEnum;
    @Output() filtersChanged = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group({
        dateRange: this.defaultDateRange,
        invoiceIDs: null,
        shopIDs: null,
        invoiceStatus: null,
    });
    shops$ = defer(() => this.realm$).pipe(
        filterShopsByRealm(this.shopsDataService.shops$),
        shareReplayRefCount(),
    );
    isAdditionalFilterApplied$ = defer(() => this.additionalFilters$).pipe(map(negate(isEmpty)));

    get keys(): string[] {
        return this.mediaObserver.isActive('gt-sm')
            ? [...MAIN_FILTERS, ...ADDITIONAL_FILTERS]
            : MAIN_FILTERS;
    }

    private additionalFilters$ = new BehaviorSubject<AdditionalFilters>({});
    private realm$ = new ReplaySubject<RealmEnum>(1);

    constructor(
        private fb: FormBuilder,
        private shopsDataService: ShopsDataService,
        private dialog: MatDialog,
        private mediaObserver: MediaObserver,
    ) {}

    ngOnInit(): void {
        combineLatest([
            getFormValueChanges(this.form).pipe(
                map((filters) => pick(filters, this.keys) as MainFilters),
            ),
            this.additionalFilters$.pipe(map((filters) => omit(filters, this.keys))),
        ])
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.filtersChanged.next(Object.assign({}, ...filters)));
    }

    ngOnChanges({ realm, initParams }: ComponentChanges<InvoicesSearchFiltersComponent>): void {
        if (realm) this.realm$.next(realm.currentValue);
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(pick(initParams.currentValue, this.keys));
            this.additionalFilters$.next(omit(initParams.currentValue, this.keys));
        }
    }

    openFiltersDialog(): void {
        this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, {
                data: omit(this.initParams, this.keys),
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.additionalFilters$.next(filters));
    }
}

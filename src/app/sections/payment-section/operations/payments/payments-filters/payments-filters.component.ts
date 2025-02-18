import {
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ComponentChanges } from '@vality/ng-core';
import { Shop, PaymentInstitution } from '@vality/swag-payments';
import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import { MediaObserver } from 'ng-flex-layout';
import { defer, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';
import { DateRange, Preset, createDateRangeWithPreset } from '@dsh/components/date-range-filter';
import { getFormValueChanges } from '@dsh/utils';

import { filterShopsByRealm } from '../../operators';

import { AdditionalFilters, FloatingFilters } from './additional-filters';
import { DialogFiltersComponent } from './additional-filters/components/dialog-filters/dialog-filters.component';
import { CardBinPan } from './card-bin-pan-filter';

import RealmEnum = PaymentInstitution.RealmEnum;

type MainFilters = {
    dateRange: DateRange;
    invoiceIDs?: string[];
    shopIDs?: Shop['id'][];
    binPan?: CardBinPan;
};
export type Filters = MainFilters & AdditionalFilters & FloatingFilters;

const MAIN_FILTERS = ['dateRange'];
const FLOATING_FILTERS = ['invoiceIDs', 'shopIDs', 'binPan'];

@Component({
    selector: 'dsh-payments-filters',
    templateUrl: 'payments-filters.component.html',
    standalone: false
})
export class PaymentsFiltersComponent implements OnInit, OnChanges {
    @Input() realm: RealmEnum;
    @Input() initParams: Filters;
    @Output() filtersChanged = new EventEmitter<MainFilters>();

    shops$ = defer(() => this.realm$).pipe(
        filterShopsByRealm(this.shopsDataService.shops$),
        shareReplay(1),
    );
    isAdditionalFilterApplied$ = defer(() => this.additionalFilters$).pipe(map(negate(isEmpty)));
    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group({
        invoiceIDs: null,
        shopIDs: null,
        binPan: null,
        dateRange: this.defaultDateRange as unknown as AbstractControl,
    });

    get keys(): string[] {
        return this.mediaObserver.isActive('gt-sm')
            ? [...MAIN_FILTERS, ...FLOATING_FILTERS]
            : MAIN_FILTERS;
    }

    private additionalFilters$ = new BehaviorSubject<AdditionalFilters>({});
    private realm$ = new ReplaySubject<RealmEnum>(1);

    constructor(
        private shopsDataService: ShopsDataService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private mediaObserver: MediaObserver,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        combineLatest([
            getFormValueChanges(this.form).pipe(
                map((filters) => pick(filters, this.keys) as MainFilters),
            ),
            this.additionalFilters$.pipe(map((filters) => omit(filters, this.keys))),
        ])
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((filters) => this.filtersChanged.next(Object.assign({}, ...filters)));
    }

    ngOnChanges({ realm, initParams }: ComponentChanges<PaymentsFiltersComponent>): void {
        if (realm) {
            this.realm$.next(realm.currentValue);
        }
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(pick(initParams.currentValue, this.keys) as unknown);
            this.additionalFilters$.next(omit(initParams.currentValue, this.keys));
        }
    }

    openFiltersDialog(): void {
        this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, {
                data: omit(this.initParams, this.keys),
            })
            .afterClosed()
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((filters) => this.additionalFilters$.next(filters));
    }
}

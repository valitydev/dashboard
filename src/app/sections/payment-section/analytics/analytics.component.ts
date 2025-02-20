import { Component } from '@angular/core';
import { QueryParamsService } from '@vality/matez';
import { ReplaySubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { PaymentInstitutionRealmService } from '../services';

import { Filters } from './analytics-search-filters/analytics-search-filters.component';
import {
    filtersToBarChartSearchParams,
    filtersToSearchParams,
} from './utils/filters-to-search-params';

@Component({
    templateUrl: 'analytics.component.html',
    standalone: false,
})
export class AnalyticsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    filters$ = new ReplaySubject<Filters>();

    accurateSearchParams$ = combineLatest([this.filters$, this.realmService.realm$]).pipe(
        map(([filters, realm]) => filtersToSearchParams(filters, realm)),
    );
    barChartSearchParams$ = combineLatest([this.filters$, this.realmService.realm$]).pipe(
        map(([filters, realm]) => filtersToBarChartSearchParams(filters, realm)),
    );

    params$ = this.qp.params$;

    constructor(
        private realmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
    ) {}

    updateFilters(filters: Filters): void {
        this.filters$.next(filters);
        void this.qp.set(filters);
    }
}

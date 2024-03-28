import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntilDestroy } from '@ngneat/until-destroy';
import { QueryParamsService } from '@vality/ng-core';
import { PaymentSearchResult, SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { PaymentInstitutionRealmService } from '../../services/payment-institution-realm.service';

import { Filters } from './payments-filters';
import { PaymentsExpandedIdManager, FetchPaymentsService } from './services';

@UntilDestroy()
@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [FetchPaymentsService, PaymentsExpandedIdManager, PaymentInstitutionRealmService],
})
export class PaymentsComponent {
    realm$ = this.paymentInstitutionRealmService.realm$;
    payments$: Observable<PaymentSearchResult[]> = this.paymentsService.paymentsList$;
    isLoading$: Observable<boolean> = this.paymentsService.isLoading$;
    hasMoreElements$: Observable<boolean> = this.paymentsService.hasMore$;
    lastUpdated$: Observable<string> = this.paymentsService.lastUpdated$;
    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;
    initParams$ = this.qp.params$;

    constructor(
        private paymentsService: FetchPaymentsService,
        private expandedIdManager: PaymentsExpandedIdManager,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
        private destroyRef: DestroyRef,
    ) {}

    refreshList(): void {
        this.paymentsService.refresh();
    }

    requestNextPage(): void {
        this.paymentsService.fetchMore();
    }

    filtersChanged(filters: Filters): void {
        void this.qp.set(filters);
        // TODO: refactor additional filters
        const { dateRange, binPan, ...otherFilters } = filters;
        const paymentMethod: Partial<SearchPaymentsRequestParams> =
            binPan?.bin || binPan?.pan ? { paymentMethod: 'bankCard' } : {};
        if (binPan?.bin) {
            paymentMethod.first6 = binPan.bin;
        }
        if (binPan?.pan) {
            paymentMethod.last4 = binPan.pan;
        }
        this.paymentInstitutionRealmService.realm$
            .pipe(take(1), takeUntilDestroyed(this.destroyRef))
            .subscribe((paymentInstitutionRealm) => {
                this.paymentsService.search({
                    ...otherFilters,
                    ...paymentMethod,
                    fromTime: dateRange.start.clone().utc().format(),
                    toTime: dateRange.end.clone().utc().format(),
                    paymentInstitutionRealm,
                });
            });
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}

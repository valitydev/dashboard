import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';

import { QueryParamsService } from '@dsh/app/shared/services';

import { Filters } from './payments-filters';
import { PaymentsExpandedIdManager, FetchPaymentsService } from './services';
import { PaymentSearchFormValue } from './types';
import { RealmMixService } from '../../services';
import { PaymentInstitutionRealmService } from '../../services/payment-institution-realm.service';

@UntilDestroy()
@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [FetchPaymentsService, PaymentsExpandedIdManager, RealmMixService, PaymentInstitutionRealmService],
})
export class PaymentsComponent implements OnInit {
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
        private realmMixService: RealmMixService<PaymentSearchFormValue>
    ) {}

    ngOnInit(): void {
        this.realmMixService.mixedValue$.pipe(untilDestroyed(this)).subscribe((v) => this.paymentsService.search(v));
    }

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
        const paymentMethod: Partial<PaymentSearchFormValue> =
            binPan?.bin || binPan?.pan ? { paymentMethod: 'bankCard' } : {};
        if (binPan?.bin) paymentMethod.first6 = binPan.bin;
        if (binPan?.pan) paymentMethod.last4 = binPan.pan;
        this.realmMixService.mix({
            ...otherFilters,
            ...paymentMethod,
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            realm: null,
        });
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}

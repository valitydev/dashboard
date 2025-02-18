import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService, QueryParamsService } from '@vality/ng-core';
import { take } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';
import { SpinnerType } from '@dsh/components/indicators';

import { RealmMixService, PaymentInstitutionRealmService } from '../../services';
import { filterShopsByRealm } from '../operators';

import { CreateInvoiceService } from './create-invoice';
import { Filters, SearchFiltersParams } from './invoices-search-filters';
import { FetchInvoicesService } from './services/fetch-invoices/fetch-invoices.service';
import { InvoicesExpandedIdManager } from './services/invoices-expanded-id-manager/invoices-expanded-id-manager.service';

@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    providers: [FetchInvoicesService, InvoicesExpandedIdManager, RealmMixService],
    standalone: false,
})
export class InvoicesComponent implements OnInit {
    invoices$ = this.invoicesService.searchResult$;
    hasMore$ = this.invoicesService.hasMore$;
    lastUpdated$ = this.invoicesService.lastUpdated$;
    isLoading$ = this.invoicesService.isLoading$;
    expandedId$ = this.invoicesExpandedIdManager.expandedId$;
    fetchErrors$ = this.invoicesService.errors$;
    spinnerType = SpinnerType.FulfillingBouncingCircle;
    realm$ = this.paymentInstitutionRealmService.realm$;
    params$ = this.qp.params$;
    shops$ = this.paymentInstitutionRealmService.realm$.pipe(
        filterShopsByRealm(this.shopsDataService.shops$),
    );

    constructor(
        private invoicesService: FetchInvoicesService,
        private createInvoiceService: CreateInvoiceService,
        private invoicesExpandedIdManager: InvoicesExpandedIdManager,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
        private realmMixService: RealmMixService<SearchFiltersParams>,
        private shopsDataService: ShopsDataService,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.invoicesService.errors$
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((err) =>
                this.log.error(
                    err,
                    this.transloco.selectTranslate('shared.commonError', null, 'components'),
                ),
            );
        this.realmMixService.mixedValue$
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((v) => this.invoicesService.search(v));
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...otherFilters } = p;
        this.realmMixService.mix({
            ...otherFilters,
            fromTime: dateRange.start.clone().utc().format(),
            toTime: dateRange.end.clone().utc().format(),
            realm: null,
        });
    }

    expandedIdChange(id: number): void {
        this.invoicesExpandedIdManager.expandedIdChange(id);
    }

    fetchMore(): void {
        this.invoicesService.fetchMore();
    }

    refresh(): void {
        this.invoicesService.refresh();
    }

    create(): void {
        this.paymentInstitutionRealmService.realm$.pipe(take(1)).subscribe((realm) =>
            this.createInvoiceService
                .createInvoice(realm)
                .pipe(takeUntilDestroyed(this.dr))
                .subscribe((invoiceID) => this.refreshAndShowNewInvoice(invoiceID)),
        );
    }

    refreshAndShowNewInvoice(_invoiceID: string): void {
        this.refresh();
    }
}

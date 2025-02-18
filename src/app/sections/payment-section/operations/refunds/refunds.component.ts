import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService, QueryParamsService } from '@vality/ng-core';

import { RealmMixService, RealmShopsService } from '../../services';

import { Filters, SearchFiltersParams } from './refunds-search-filters';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';
import { RefundsExpandedIdManager } from './services/refunds-expanded-id-manager/refunds-expanded-id-manager.service';

@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    providers: [FetchRefundsService, RefundsExpandedIdManager, RealmMixService],
    standalone: false
})
export class RefundsComponent implements OnInit {
    refunds$ = this.fetchRefundsService.searchResult$;
    isLoading$ = this.fetchRefundsService.isLoading$;
    hasMore$ = this.fetchRefundsService.hasMore$;
    lastUpdated$ = this.fetchRefundsService.lastUpdated$;
    expandedId$ = this.refundsExpandedIdManager.expandedId$;
    params$ = this.qp.params$;
    fetchErrors$ = this.fetchRefundsService.errors$;
    shops$ = this.realmShopsService.shops$;

    constructor(
        private fetchRefundsService: FetchRefundsService,
        private refundsExpandedIdManager: RefundsExpandedIdManager,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private qp: QueryParamsService<Filters>,
        private realmShopsService: RealmShopsService,
        private realmMixinService: RealmMixService<SearchFiltersParams>,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.fetchRefundsService.errors$.subscribe((err) =>
            this.log.error(
                err,
                this.transloco.selectTranslate(
                    'operations.refunds.fetchError',
                    null,
                    'payment-section',
                ),
            ),
        );
        this.realmMixinService.mixedValue$
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((v) => this.fetchRefundsService.search(v));
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...params } = p;
        this.realmMixinService.mix({
            realm: null,
            fromTime: dateRange.start.clone().utc().format(),
            toTime: dateRange.end.clone().utc().format(),
            ...params,
        });
    }

    expandedIdChange(id: number): void {
        this.refundsExpandedIdManager.expandedIdChange(id);
    }

    fetchMore(): void {
        this.fetchRefundsService.fetchMore();
    }

    refresh(): void {
        this.fetchRefundsService.refresh();
    }
}

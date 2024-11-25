import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService, QueryParamsService } from '@vality/ng-core';

import { shareReplayRefCount } from '@dsh/app/custom-operators';

import { FetchWithdrawalsService, WithdrawalsExpandedIdManager } from './services';
import { WithdrawalsFilters } from './withdrawals-filters';

@Component({
    templateUrl: 'withdrawals.component.html',
    providers: [FetchWithdrawalsService, WithdrawalsExpandedIdManager],
})
export class WithdrawalsComponent implements OnInit {
    withdrawals$ = this.fetchWithdrawalsService.searchResult$;
    hasMore$ = this.fetchWithdrawalsService.hasMore$;
    doAction$ = this.fetchWithdrawalsService.doAction$;
    isLoading$ = this.doAction$.pipe(shareReplayRefCount());
    lastUpdated$ = this.fetchWithdrawalsService.lastUpdated$;
    expandedId$ = this.withdrawalsExpandedIdManager.expandedId$;
    initParams$ = this.qp.params$;

    constructor(
        private fetchWithdrawalsService: FetchWithdrawalsService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private withdrawalsExpandedIdManager: WithdrawalsExpandedIdManager,
        private qp: QueryParamsService<WithdrawalsFilters>,
    ) {}

    ngOnInit(): void {
        this.fetchWithdrawalsService.errors$.subscribe((err) =>
            this.log.error(
                err,
                this.transloco.selectTranslate('withdrawals.fetchError', null, 'wallet-section'),
            ),
        );
    }

    filtersChanged(filters: WithdrawalsFilters): void {
        void this.qp.set(filters);
        this.fetchWithdrawalsService.search({
            ...filters,
            createdAtFrom: filters.dateRange.start.clone().utc().format(),
            createdAtTo: filters.dateRange.end.clone().utc().format(),
        });
    }

    expandedIdChange(id: number): void {
        this.withdrawalsExpandedIdManager.expandedIdChange(id);
    }

    fetchMore(): void {
        this.fetchWithdrawalsService.fetchMore();
    }

    refresh(): void {
        this.fetchWithdrawalsService.refresh();
    }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { QueryParamsService } from '@dsh/app/shared/services/query-params';

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
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private withdrawalsExpandedIdManager: WithdrawalsExpandedIdManager,
        private qp: QueryParamsService<WithdrawalsFilters>
    ) {}

    ngOnInit(): void {
        this.fetchWithdrawalsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('withdrawals.fetchError', null, 'wallet-section'), 'OK')
        );
    }

    filtersChanged(filters: WithdrawalsFilters): void {
        void this.qp.set(filters);
        this.fetchWithdrawalsService.search({
            ...filters,
            createdAtFrom: filters.dateRange.start.utc().format(),
            createdAtTo: filters.dateRange.end.utc().format(),
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

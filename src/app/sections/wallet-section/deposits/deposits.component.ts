import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QueryParamsService } from '@vality/matez';

import { ErrorService } from '@dsh/app/shared';

import { DepositsFilters } from './deposits-filters/types/deposits-filters';
import { DepositsExpandedIdManagerService } from './services/deposits-expanded-id-manager/deposits-expanded-id-manager.service';
import { FetchDepositsService } from './services/fetch-deposits/fetch-deposits.service';
import { filtersToSearchParams } from './utils/filters-to-search-params';

@Component({
    templateUrl: 'deposits.component.html',
    providers: [FetchDepositsService, DepositsExpandedIdManagerService],
    standalone: false,
})
export class DepositsComponent {
    deposits$ = this.fetchDepositsService.searchResult$;
    hasMore$ = this.fetchDepositsService.hasMore$;
    lastUpdated$ = this.fetchDepositsService.lastUpdated$;
    isLoading$ = this.fetchDepositsService.isLoading$;
    expandedId$ = this.depositsExpandedIdManagerService.expandedId$;
    initParams$ = this.qp.params$;

    constructor(
        private fetchDepositsService: FetchDepositsService,
        private depositsExpandedIdManagerService: DepositsExpandedIdManagerService,
        private errorsService: ErrorService,
        private qp: QueryParamsService<DepositsFilters>,
        private dr: DestroyRef,
    ) {
        this.fetchDepositsService.errors$
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((error: Error) => {
                this.errorsService.error(error);
            });
    }

    refreshList(): void {
        this.fetchDepositsService.refresh();
    }

    requestNextPage(): void {
        this.fetchDepositsService.fetchMore();
    }

    filtersChanged(filters: DepositsFilters): void {
        void this.qp.set(filters);
        this.fetchDepositsService.search(filtersToSearchParams(filters));
    }

    expandedIdChange(id: number): void {
        this.depositsExpandedIdManagerService.expandedIdChange(id);
    }
}

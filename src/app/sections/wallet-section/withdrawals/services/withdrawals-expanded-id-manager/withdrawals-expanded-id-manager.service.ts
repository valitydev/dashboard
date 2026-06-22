import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpandedIdManager } from '@dsh/app/shared/services';

import { Withdrawal } from '@vality/swag-wallets';

import { FetchWithdrawalsService } from '../fetch-withdrawals';

@Injectable()
export class WithdrawalsExpandedIdManager extends ExpandedIdManager<Withdrawal> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchWithdrawalsService: FetchWithdrawalsService,
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Withdrawal[]> {
        return this.fetchWithdrawalsService.searchResult$;
    }

    protected fragmentNotFound(): void {
        this.fetchWithdrawalsService.fetchMore();
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deposit } from '@vality/swag-wallets';
import { Observable } from 'rxjs';

import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { FetchDepositsService } from '../fetch-deposits/fetch-deposits.service';

@Injectable()
export class DepositsExpandedIdManagerService extends ExpandedIdManager<Deposit> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private depositsService: FetchDepositsService,
    ) {
        super(route, router);
    }

    protected toFragment(deposit: Deposit): Fragment {
        return deposit.id;
    }

    protected fragmentNotFound(): void {
        this.depositsService.fetchMore();
    }

    protected get dataSet$(): Observable<Deposit[]> {
        return this.depositsService.searchResult$;
    }
}

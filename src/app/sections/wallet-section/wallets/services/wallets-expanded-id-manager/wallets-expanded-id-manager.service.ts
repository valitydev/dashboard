import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Wallet } from '@vality/swag-wallet';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { FetchWalletsService } from '../fetch-wallets';

@Injectable()
export class WalletsExpandedIdManager extends ExpandedIdManager<Wallet> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchWalletsService: FetchWalletsService
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Wallet[]> {
        return this.fetchWalletsService.searchResult$;
    }

    protected fragmentNotFound(): void {
        this.fetchWalletsService.fetchMore();
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { startWith } from 'rxjs/operators';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { FetchDepositRevertsService } from './services/fetch-deposit-reverts.service';

@Component({
    selector: 'dsh-deposit-reverts',
    templateUrl: 'deposit-reverts.component.html',
    providers: [
        FetchDepositRevertsService,
        {
            provide: SEARCH_LIMIT,
            useValue: 3,
        },
    ],
    standalone: false,
})
export class DepositRevertsComponent implements OnInit {
    @Input() depositID: string;

    reverts$ = this.fetchDepositRevertsService.searchResult$;
    hasMore$ = this.fetchDepositRevertsService.hasMore$;
    isLoading$ = this.fetchDepositRevertsService.isLoading$.pipe(startWith(true));

    constructor(private fetchDepositRevertsService: FetchDepositRevertsService) {}

    ngOnInit(): void {
        this.fetchDepositRevertsService.search({
            depositID: this.depositID,
        });
    }

    fetchMore() {
        this.fetchDepositRevertsService.fetchMore();
    }
}

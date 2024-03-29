import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefundSearchResult } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';

import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { FetchRefundsService } from '../fetch-refunds/fetch-refunds.service';

@Injectable()
export class RefundsExpandedIdManager extends ExpandedIdManager<RefundSearchResult> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchRefundsService: FetchRefundsService,
    ) {
        super(route, router);
    }

    protected toFragment(refund: RefundSearchResult): Fragment {
        return `${refund.invoiceID}${refund.paymentID}${refund.id}`;
    }

    protected fragmentNotFound(): void {
        this.fetchRefundsService.fetchMore();
    }

    protected get dataSet$(): Observable<RefundSearchResult[]> {
        return this.fetchRefundsService.searchResult$;
    }
}

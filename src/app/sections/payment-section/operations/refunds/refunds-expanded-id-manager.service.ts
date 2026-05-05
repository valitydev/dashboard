import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Refund } from '@vality/swag-payments';
import { Observable } from 'rxjs';

import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';

@Injectable()
export class RefundsExpandedIdManager extends ExpandedIdManager<Refund> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchRefundsService: FetchRefundsService,
    ) {
        super(route, router);
    }

    protected toFragment(r: Refund): Fragment {
        return `${r.invoiceID}${r.paymentID}${r.id}`;
    }

    protected get dataSet$(): Observable<Refund[]> {
        return this.fetchRefundsService.searchResult$;
    }
}

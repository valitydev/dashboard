import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';

import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { getPaymentId } from '../../utils/get-payment-id';
import { FetchPaymentsService } from '../fetch-payments/fetch-payments.service';

// TODO: implement ux solve for pagination list to display elements from not the first page(like 3 dots between our details element and main list data)
// load everything until it's found is a bad decision
@Injectable()
export class PaymentsExpandedIdManager extends ExpandedIdManager<PaymentSearchResult> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private paymentsService: FetchPaymentsService,
    ) {
        super(route, router);
    }

    protected toFragment(payment: PaymentSearchResult): Fragment {
        return getPaymentId(payment);
    }

    protected fragmentNotFound(): void {
        this.paymentsService.fetchMore();
    }

    protected get dataSet$(): Observable<PaymentSearchResult[]> {
        return this.paymentsService.paymentsList$;
    }
}

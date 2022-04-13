import { NgModule } from '@angular/core';

import { PaymentSearchService } from './payment-search.service';
import { PayoutSearchService } from './payout-search.service';
import { RefundSearchService } from './refund-search.service';

@NgModule({
    providers: [PaymentSearchService, RefundSearchService, PayoutSearchService],
})
export class SearchModule {}

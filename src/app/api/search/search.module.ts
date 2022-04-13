import { NgModule } from '@angular/core';

import { PayoutSearchService } from './payout-search.service';
import { RefundSearchService } from './refund-search.service';

@NgModule({
    providers: [RefundSearchService, PayoutSearchService],
})
export class SearchModule {}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { RefundsAmountService } from './refunds-amount.service';
import { SearchParams } from '../search-params';

@Component({
    selector: 'dsh-refunds-amount',
    templateUrl: 'refunds-amount.component.html',
    providers: [RefundsAmountService],
})
export class RefundsAmountComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    refundsAmount$ = this.refundsAmountService.refundsAmount$;
    isLoading$ = this.refundsAmountService.isLoading$;
    error$ = this.refundsAmountService.error$;

    constructor(private refundsAmountService: RefundsAmountService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.refundsAmountService.updateSearchParams(this.searchParams);
        }
    }
}

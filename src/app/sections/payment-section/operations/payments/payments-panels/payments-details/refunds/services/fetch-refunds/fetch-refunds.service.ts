import { Inject, Injectable } from '@angular/core';
import { SearchRefundsRequestParams, RefundSearchResult } from '@vality/swag-anapi-v2';
import moment from 'moment';
import { Observable, switchMap } from 'rxjs';
import { shareReplay, first } from 'rxjs/operators';

import { SearchService } from '@dsh/api/anapi';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@dsh/app/shared';

import { PaymentInstitutionRealmService } from '../../../../../../../services';

@Injectable()
export class FetchRefundsService extends PartialFetcher<
    RefundSearchResult,
    Pick<SearchRefundsRequestParams, 'invoiceID' | 'paymentID'>
> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));

    constructor(
        private searchService: SearchService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        { invoiceID, paymentID }: Pick<SearchRefundsRequestParams, 'invoiceID' | 'paymentID'>,
        continuationToken: string
    ) {
        return this.paymentInstitutionRealmService.realm$.pipe(
            first(),
            switchMap((paymentInstitutionRealm) =>
                this.searchService.searchRefunds({
                    fromTime: moment().subtract(3, 'y').startOf('d').utc().format(),
                    toTime: moment().endOf('d').utc().format(),
                    invoiceID,
                    paymentID,
                    limit: this.searchLimit,
                    continuationToken,
                    paymentInstitutionRealm,
                })
            )
        );
    }
}

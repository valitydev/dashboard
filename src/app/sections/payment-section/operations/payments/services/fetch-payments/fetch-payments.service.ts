import { Inject, Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { SearchService } from '@dsh/app/api/anapi';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@dsh/app/shared';
import { isNumber } from '@dsh/app/shared/utils';

import { PaymentSearchFormValue } from '../../types';

@Injectable()
export class FetchPaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));
    paymentsList$: Observable<PaymentSearchResult[]> = this.searchResult$;

    constructor(
        private searchService: SearchService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        { paymentAmountFrom, paymentAmountTo, realm, ...params }: PaymentSearchFormValue,
        continuationToken?: string
    ) {
        return this.searchService
            .searchPayments({
                ...params,
                paymentInstitutionRealm: realm,
                paymentAmountFrom: isNumber(paymentAmountFrom) ? paymentAmountFrom : undefined,
                paymentAmountTo: isNumber(paymentAmountTo) ? paymentAmountTo : undefined,
                limit: this.searchLimit,
                continuationToken,
            })
            .pipe(
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('shared.httpError', null, 'components'), 'OK');
                    return of({ result: [] });
                })
            );
    }
}

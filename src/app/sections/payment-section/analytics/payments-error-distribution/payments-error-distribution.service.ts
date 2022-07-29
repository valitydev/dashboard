import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, ReplaySubject, defer, combineLatest } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';
import { shareReplayRefCount } from '@dsh/operators';
import { errorTo, progressTo, distinctUntilChangedDeep, inProgressFrom, attach } from '@dsh/utils';

import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';
import { ErrorDistribution } from './error-distribution';
import { errorsDistributionToChartData } from './errors-distribution-to-chart-data';
import { getSelectedErrorDistribution } from './get-selected-error-distribution';
import { subErrorsToErrorDistribution } from './sub-errors-to-error-distribution';

@Injectable()
export class PaymentsErrorDistributionService {
    currentErrorTitle$ = defer(() => combineLatest([this.errorDistribution$, this.errorLabels$])).pipe(
        map(([{ errorCode }, errorLabels]) => errorLabels[errorCode])
    );
    chartData$ = defer(() => combineLatest([this.errorDistribution$, this.errorLabels$])).pipe(
        map(([{ subErrors }, errorLabels]) => errorsDistributionToChartData(subErrors, errorLabels))
    );
    isLoading$ = inProgressFrom(
        () => this.progress$,
        () => this.errorDistribution$
    );
    error$ = attach(
        () => this.errorSub$,
        () => this.errorDistribution$
    );

    private errorDistribution$ = combineLatest([
        defer(() => this.searchParams$).pipe(
            distinctUntilChangedDeep(),
            map(searchParamsToDistributionSearchParams),
            switchMap(({ fromTime, toTime, shopIDs, realm }) =>
                this.analyticsService
                    .getPaymentsSubErrorDistribution({ fromTime, toTime, paymentInstitutionRealm: realm, shopIDs })
                    .pipe(errorTo(this.errorSub$), progressTo(this.progress$))
            ),
            pluck('result'),
            map(subErrorsToErrorDistribution)
        ),
        defer(() => this.selectedSubError$),
    ]).pipe(
        map(([errorDistribution, selectedSubErrorPath]) =>
            getSelectedErrorDistribution(errorDistribution, selectedSubErrorPath)
        ),
        shareReplayRefCount()
    );
    private searchParams$ = new ReplaySubject<SearchParams>(1);
    private selectedSubError$ = new BehaviorSubject<number[]>([]);
    private errorSub$ = new ReplaySubject<unknown>(1);
    private progress$ = new BehaviorSubject<number>(0);
    private errorLabels$ = this.transloco.selectTranslation('payment-section').pipe(map(() => this.getErrorLabels()));

    constructor(private analyticsService: AnalyticsService, private transloco: TranslocoService) {}

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }

    updateDataSelection(value: number) {
        this.selectedSubError$.next(this.selectedSubError$.getValue().concat(value));
    }

    goBackDataSelection() {
        this.selectedSubError$.next(this.selectedSubError$.getValue().slice(0, -1));
    }

    private getErrorLabels(): Record<ErrorDistribution['errorCode'], string> {
        return {
            account_limit_exceeded: this.transloco.translate(
                'analytics.errorCodes.account_limit_exceeded',
                null,
                'payment-section'
            ),
            account_not_found: this.transloco.translate(
                'analytics.errorCodes.account_not_found',
                null,
                'payment-section'
            ),
            amount: this.transloco.translate('analytics.errorCodes.amount', null, 'payment-section'),
            authorization_failed: this.transloco.translate(
                'analytics.errorCodes.authorization_failed',
                null,
                'payment-section'
            ),
            bank_card_rejected: this.transloco.translate(
                'analytics.errorCodes.bank_card_rejected',
                null,
                'payment-section'
            ),
            card_expired: this.transloco.translate('analytics.errorCodes.card_expired', null, 'payment-section'),
            card_number_invalid: this.transloco.translate(
                'analytics.errorCodes.card_number_invalid',
                null,
                'payment-section'
            ),
            insufficient_funds: this.transloco.translate(
                'analytics.errorCodes.insufficient_funds',
                null,
                'payment-section'
            ),
            no_route_found: this.transloco.translate('analytics.errorCodes.no_route_found', null, 'payment-section'),
            number: this.transloco.translate('analytics.errorCodes.number', null, 'payment-section'),
            operation_blocked: this.transloco.translate(
                'analytics.errorCodes.operation_blocked',
                null,
                'payment-section'
            ),
            operation_timeout: this.transloco.translate(
                'analytics.errorCodes.operation_timeout',
                null,
                'payment-section'
            ),
            payment_tool_rejected: this.transloco.translate(
                'analytics.errorCodes.payment_tool_rejected',
                null,
                'payment-section'
            ),
            preauthorization_failed: this.transloco.translate(
                'analytics.errorCodes.preauthorization_failed',
                null,
                'payment-section'
            ),
            processing_deadline_reached: this.transloco.translate(
                'analytics.errorCodes.processing_deadline_reached',
                null,
                'payment-section'
            ),
            rejected_by_issuer: this.transloco.translate(
                'analytics.errorCodes.rejected_by_issuer',
                null,
                'payment-section'
            ),
            risk_score_is_too_high: this.transloco.translate(
                'analytics.errorCodes.risk_score_is_too_high',
                null,
                'payment-section'
            ),
            security_policy_violated: this.transloco.translate(
                'analytics.errorCodes.security_policy_violated',
                null,
                'payment-section'
            ),
            three_ds_failed: this.transloco.translate('analytics.errorCodes.three_ds_failed', null, 'payment-section'),
            three_ds_not_finished: this.transloco.translate(
                'analytics.errorCodes.three_ds_not_finished',
                null,
                'payment-section'
            ),
            other: this.transloco.translate('analytics.errorCodes.other', null, 'payment-section'),
        };
    }
}

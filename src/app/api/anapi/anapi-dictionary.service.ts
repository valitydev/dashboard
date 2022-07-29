import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { StatusOffsetCount } from '@vality/swag-anapi-v2';

import StatusEnum = StatusOffsetCount.StatusEnum;

@Injectable({
    providedIn: 'root',
})
export class AnapiDictionaryService {
    constructor(private t: TranslocoService) {}

    getPaymentToolLabels() {
        return {
            bank_card: this.t.translate('analytics.paymentTools.bank_card', null, 'dictionary'),
            digital_wallet: this.t.translate('analytics.paymentTools.digital_wallet', null, 'dictionary'),
            payment_terminal: this.t.translate('analytics.paymentTools.payment_terminal', null, 'dictionary'),
        };
    }

    getErrorCodeLabels() {
        return {
            account_limit_exceeded: this.t.translate('analytics.errorCodes.account_limit_exceeded', null, 'dictionary'),
            account_not_found: this.t.translate('analytics.errorCodes.account_not_found', null, 'dictionary'),
            amount: this.t.translate('analytics.errorCodes.amount', null, 'dictionary'),
            authorization_failed: this.t.translate('analytics.errorCodes.authorization_failed', null, 'dictionary'),
            bank_card_rejected: this.t.translate('analytics.errorCodes.bank_card_rejected', null, 'dictionary'),
            card_expired: this.t.translate('analytics.errorCodes.card_expired', null, 'dictionary'),
            card_number_invalid: this.t.translate('analytics.errorCodes.card_number_invalid', null, 'dictionary'),
            insufficient_funds: this.t.translate('analytics.errorCodes.insufficient_funds', null, 'dictionary'),
            no_route_found: this.t.translate('analytics.errorCodes.no_route_found', null, 'dictionary'),
            number: this.t.translate('analytics.errorCodes.number', null, 'dictionary'),
            operation_blocked: this.t.translate('analytics.errorCodes.operation_blocked', null, 'dictionary'),
            operation_timeout: this.t.translate('analytics.errorCodes.operation_timeout', null, 'dictionary'),
            payment_tool_rejected: this.t.translate('analytics.errorCodes.payment_tool_rejected', null, 'dictionary'),
            preauthorization_failed: this.t.translate(
                'analytics.errorCodes.preauthorization_failed',
                null,
                'dictionary'
            ),
            processing_deadline_reached: this.t.translate(
                'analytics.errorCodes.processing_deadline_reached',
                null,
                'dictionary'
            ),
            rejected_by_issuer: this.t.translate('analytics.errorCodes.rejected_by_issuer', null, 'dictionary'),
            risk_score_is_too_high: this.t.translate('analytics.errorCodes.risk_score_is_too_high', null, 'dictionary'),
            security_policy_violated: this.t.translate(
                'analytics.errorCodes.security_policy_violated',
                null,
                'dictionary'
            ),
            three_ds_failed: this.t.translate('analytics.errorCodes.three_ds_failed', null, 'dictionary'),
            three_ds_not_finished: this.t.translate('analytics.errorCodes.three_ds_not_finished', null, 'dictionary'),
            other: this.t.translate('analytics.errorCodes.other', null, 'dictionary'),
        };
    }

    getPaymentStatusLabels(): Record<StatusEnum, string> {
        return {
            pending: this.t.translate('analytics.paymentStatuses.pending', null, 'dictionary'),
            processed: this.t.translate('analytics.paymentStatuses.processed', null, 'dictionary'),
            captured: this.t.translate('analytics.paymentStatuses.captured', null, 'dictionary'),
            cancelled: this.t.translate('analytics.paymentStatuses.cancelled', null, 'dictionary'),
            refunded: this.t.translate('analytics.paymentStatuses.refunded', null, 'dictionary'),
            failed: this.t.translate('analytics.paymentStatuses.failed', null, 'dictionary'),
        };
    }
}

import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { StatusOffsetCount } from '@vality/swag-anapi-v2';

import { DictionaryService } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class AnapiDictionaryService {
    paymentTool$ = this.dictionaryService.create(() => ({
        bank_card: this.t.translate('anapi.paymentTool.bank_card', null, 'dictionary'),
        digital_wallet: this.t.translate('anapi.paymentTool.digital_wallet', null, 'dictionary'),
        payment_terminal: this.t.translate('anapi.paymentTool.payment_terminal', null, 'dictionary'),
    }));

    errorCode$ = this.dictionaryService.create(() => ({
        account_limit_exceeded: this.t.translate('anapi.errorCode.account_limit_exceeded', null, 'dictionary'),
        account_not_found: this.t.translate('anapi.errorCode.account_not_found', null, 'dictionary'),
        amount: this.t.translate('anapi.errorCode.amount', null, 'dictionary'),
        authorization_failed: this.t.translate('anapi.errorCode.authorization_failed', null, 'dictionary'),
        bank_card_rejected: this.t.translate('anapi.errorCode.bank_card_rejected', null, 'dictionary'),
        card_expired: this.t.translate('anapi.errorCode.card_expired', null, 'dictionary'),
        card_number_invalid: this.t.translate('anapi.errorCode.card_number_invalid', null, 'dictionary'),
        insufficient_funds: this.t.translate('anapi.errorCode.insufficient_funds', null, 'dictionary'),
        no_route_found: this.t.translate('anapi.errorCode.no_route_found', null, 'dictionary'),
        number: this.t.translate('anapi.errorCode.number', null, 'dictionary'),
        operation_blocked: this.t.translate('anapi.errorCode.operation_blocked', null, 'dictionary'),
        operation_timeout: this.t.translate('anapi.errorCode.operation_timeout', null, 'dictionary'),
        payment_tool_rejected: this.t.translate('anapi.errorCode.payment_tool_rejected', null, 'dictionary'),
        preauthorization_failed: this.t.translate('anapi.errorCode.preauthorization_failed', null, 'dictionary'),
        processing_deadline_reached: this.t.translate(
            'anapi.errorCode.processing_deadline_reached',
            null,
            'dictionary'
        ),
        rejected_by_issuer: this.t.translate('anapi.errorCode.rejected_by_issuer', null, 'dictionary'),
        risk_score_is_too_high: this.t.translate('anapi.errorCode.risk_score_is_too_high', null, 'dictionary'),
        security_policy_violated: this.t.translate('anapi.errorCode.security_policy_violated', null, 'dictionary'),
        three_ds_failed: this.t.translate('anapi.errorCode.three_ds_failed', null, 'dictionary'),
        three_ds_not_finished: this.t.translate('anapi.errorCode.three_ds_not_finished', null, 'dictionary'),
        other: this.t.translate('anapi.errorCode.other', null, 'dictionary'),
    }));

    paymentStatus$ = this.dictionaryService.create<StatusOffsetCount.StatusEnum>(() => ({
        pending: this.t.translate('anapi.paymentStatus.pending', null, 'dictionary'),
        processed: this.t.translate('anapi.paymentStatus.processed', null, 'dictionary'),
        captured: this.t.translate('anapi.paymentStatus.captured', null, 'dictionary'),
        cancelled: this.t.translate('anapi.paymentStatus.cancelled', null, 'dictionary'),
        refunded: this.t.translate('anapi.paymentStatus.refunded', null, 'dictionary'),
        failed: this.t.translate('anapi.paymentStatus.failed', null, 'dictionary'),
    }));

    constructor(private t: TranslocoService, private dictionaryService: DictionaryService) {}
}

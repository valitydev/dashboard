import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { PaymentError } from '@vality/swag-payments';
import isObject from 'lodash-es/isObject';
import lowerCase from 'lodash-es/lowerCase';
import upperFirst from 'lodash-es/upperFirst';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

function renderSubErrorMessage(error?: string, sub?: string) {
    if (!error) {
        return sub;
    }
    if (!sub) {
        return error;
    }
    return `${error} -> ${sub}`;
}

function getErrorLabel(error: PaymentError) {
    const label = upperFirst(lowerCase(error.code));
    return renderSubErrorMessage(label, error.subError?.code && getErrorLabel(error.subError));
}

@Pipe({
    name: 'paymentErrorMessage',
})
export class PaymentErrorMessagePipe implements PipeTransform {
    constructor(private t: TranslocoService) {}

    transform(error: PaymentError): Observable<string> {
        return this.formatErrors(error);
    }

    private formatErrors(error: PaymentError) {
        return this.t.selectTranslation('payment-section').pipe(
            first(),
            map(() => {
                let curError: PaymentError = error;
                let translationPath = this.getErrorDict();
                let errorsMessage = '';

                while (isObject(curError)) {
                    const { code, subError } = curError;
                    translationPath = translationPath?.[code];

                    const currMessage = subError ? translationPath?.['message'] : translationPath;
                    const message: string =
                        currMessage && typeof currMessage !== 'object'
                            ? currMessage
                            : error.code === 'authorization_failed'
                              ? getErrorLabel(curError)
                              : this.t.translate(
                                    'paymentErrorMessage.unknownError',
                                    null,
                                    'payment-section',
                                );
                    errorsMessage = renderSubErrorMessage(errorsMessage, message);

                    curError = subError;
                }

                return errorsMessage;
            }),
        );
    }

    private getErrorDict() {
        return {
            authorization_failed: {
                account_blocked: this.t.translate(
                    'paymentErrorMessage.authorization_failed.account_blocked',
                    null,
                    'payment-section',
                ),
                account_limit_exceeded: {
                    amount: this.t.translate(
                        'paymentErrorMessage.authorization_failed.account_limit_exceeded.amount',
                        null,
                        'payment-section',
                    ),
                    message: this.t.translate(
                        'paymentErrorMessage.authorization_failed.account_limit_exceeded.message',
                        null,
                        'payment-section',
                    ),
                    number: this.t.translate(
                        'paymentErrorMessage.authorization_failed.account_limit_exceeded.number',
                        null,
                        'payment-section',
                    ),
                    unknown: this.t.translate(
                        'paymentErrorMessage.authorization_failed.account_limit_exceeded.unknown',
                        null,
                        'payment-section',
                    ),
                },
                account_not_found: this.t.translate(
                    'paymentErrorMessage.authorization_failed.account_not_found',
                    null,
                    'payment-section',
                ),
                account_stolen: this.t.translate(
                    'paymentErrorMessage.authorization_failed.account_stolen',
                    null,
                    'payment-section',
                ),
                insufficient_funds: this.t.translate(
                    'paymentErrorMessage.authorization_failed.insufficient_funds',
                    null,
                    'payment-section',
                ),
                merchant_blocked: this.t.translate(
                    'paymentErrorMessage.authorization_failed.merchant_blocked',
                    null,
                    'payment-section',
                ),
                message: this.t.translate(
                    'paymentErrorMessage.authorization_failed.message',
                    null,
                    'payment-section',
                ),
                operation_blocked: this.t.translate(
                    'paymentErrorMessage.authorization_failed.operation_blocked',
                    null,
                    'payment-section',
                ),
                payment_tool_rejected: {
                    bank_card_rejected: {
                        card_expired: this.t.translate(
                            'paymentErrorMessage.authorization_failed.payment_tool_rejected.bank_card_rejected.card_expired',
                            null,
                            'payment-section',
                        ),
                        card_holder_invalid: this.t.translate(
                            'paymentErrorMessage.authorization_failed.payment_tool_rejected.bank_card_rejected.card_holder_invalid',
                            null,
                            'payment-section',
                        ),
                        card_number_invalid: this.t.translate(
                            'paymentErrorMessage.authorization_failed.payment_tool_rejected.bank_card_rejected.card_number_invalid',
                            null,
                            'payment-section',
                        ),
                        cvv_invalid: this.t.translate(
                            'paymentErrorMessage.authorization_failed.payment_tool_rejected.bank_card_rejected.cvv_invalid',
                            null,
                            'payment-section',
                        ),
                        issuer_not_found: this.t.translate(
                            'paymentErrorMessage.authorization_failed.payment_tool_rejected.bank_card_rejected.issuer_not_found',
                            null,
                            'payment-section',
                        ),
                        message: this.t.translate(
                            'paymentErrorMessage.authorization_failed.payment_tool_rejected.bank_card_rejected.message',
                            null,
                            'payment-section',
                        ),
                        unknown: this.t.translate(
                            'paymentErrorMessage.authorization_failed.payment_tool_rejected.bank_card_rejected.unknown',
                            null,
                            'payment-section',
                        ),
                    },
                    message: this.t.translate(
                        'paymentErrorMessage.authorization_failed.payment_tool_rejected.message',
                        null,
                        'payment-section',
                    ),
                    unknown: this.t.translate(
                        'paymentErrorMessage.authorization_failed.payment_tool_rejected.unknown',
                        null,
                        'payment-section',
                    ),
                },
                provider_limit_exceeded: {
                    amount: this.t.translate(
                        'paymentErrorMessage.authorization_failed.provider_limit_exceeded.amount',
                        null,
                        'payment-section',
                    ),
                    message: this.t.translate(
                        'paymentErrorMessage.authorization_failed.provider_limit_exceeded.message',
                        null,
                        'payment-section',
                    ),
                    number: this.t.translate(
                        'paymentErrorMessage.authorization_failed.provider_limit_exceeded.number',
                        null,
                        'payment-section',
                    ),
                    unknown: this.t.translate(
                        'paymentErrorMessage.authorization_failed.provider_limit_exceeded.unknown',
                        null,
                        'payment-section',
                    ),
                },
                rejected_by_issuer: this.t.translate(
                    'paymentErrorMessage.authorization_failed.rejected_by_issuer',
                    null,
                    'payment-section',
                ),
                security_policy_violated: this.t.translate(
                    'paymentErrorMessage.authorization_failed.security_policy_violated',
                    null,
                    'payment-section',
                ),
                temporarily_unavailable: this.t.translate(
                    'paymentErrorMessage.authorization_failed.temporarily_unavailable',
                    null,
                    'payment-section',
                ),
                unknown: this.t.translate(
                    'paymentErrorMessage.authorization_failed.unknown',
                    null,
                    'payment-section',
                ),
            },
            no_route_found: {
                message: this.t.translate(
                    'paymentErrorMessage.no_route_found.message',
                    null,
                    'payment-section',
                ),
                risk_score_is_too_high: this.t.translate(
                    'paymentErrorMessage.no_route_found.risk_score_is_too_high',
                    null,
                    'payment-section',
                ),
                unknown: this.t.translate(
                    'paymentErrorMessage.no_route_found.unknown',
                    null,
                    'payment-section',
                ),
            },
            preauthorization_failed: {
                message: this.t.translate(
                    'paymentErrorMessage.preauthorization_failed.message',
                    null,
                    'payment-section',
                ),
                three_ds_failed: this.t.translate(
                    'paymentErrorMessage.preauthorization_failed.three_ds_failed',
                    null,
                    'payment-section',
                ),
                three_ds_not_finished: this.t.translate(
                    'paymentErrorMessage.preauthorization_failed.three_ds_not_finished',
                    null,
                    'payment-section',
                ),
                unknown: this.t.translate(
                    'paymentErrorMessage.preauthorization_failed.unknown',
                    null,
                    'payment-section',
                ),
            },
            rejected_by_inspector: this.t.translate(
                'paymentErrorMessage.rejected_by_inspector',
                null,
                'payment-section',
            ),
            timeout: this.t.translate('paymentErrorMessage.timeout', null, 'payment-section'),
        };
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentError } from '@vality/swag-payments';
import lowerCase from 'lodash-es/lowerCase';
import upperFirst from 'lodash-es/upperFirst';

function renderSubErrorMessage(error?: string, sub?: string) {
    if (!error) return sub;
    if (!sub) return error;
    return `${error} -> ${sub}`;
}

function getErrorLabel(error: PaymentError) {
    const label = upperFirst(lowerCase(error.code));
    return renderSubErrorMessage(label, error.subError?.code && getErrorLabel(error.subError));
}

@Pipe({
    name: 'withdrawalErrorMessage',
})
export class WithdrawalErrorMessagePipe implements PipeTransform {
    constructor(private t: TranslocoService) {}

    transform(error: PaymentError): string {
        return this.formatErrors(error);
    }

    private formatErrors(error: PaymentError): string {
        let curError: PaymentError = error;
        let translation = this.getErrorDict();

        while (curError?.code && translation?.[curError.code]) {
            translation = translation[curError.code];
            curError = curError.subError;
        }

        if (typeof translation === 'string') return translation;
        return getErrorLabel(error);
    }

    private getErrorDict() {
        return {
            failed: this.t.translate('withdrawalErrorMessage.failed', null, 'wallet-section'),
            authorization_failed: {
                unknown: this.t.translate(
                    'withdrawalErrorMessage.authorization_failed.unknown',
                    null,
                    'wallet-section',
                ),
            },
        };
    }
}

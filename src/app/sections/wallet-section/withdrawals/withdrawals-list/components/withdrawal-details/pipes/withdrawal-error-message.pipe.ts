import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AsyncTransform } from '@vality/ng-core';
import { PaymentError } from '@vality/swag-payments';
import lowerCase from 'lodash-es/lowerCase';
import upperFirst from 'lodash-es/upperFirst';
import { isObservable, Observable, of } from 'rxjs';

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
    pure: false,
})
export class WithdrawalErrorMessagePipe extends AsyncTransform<string> implements PipeTransform {
    constructor(private t: TranslocoService) {
        super();
    }

    protected getValue(error: PaymentError) {
        return this.formatErrors(error);
    }

    private formatErrors(error: PaymentError): Observable<string> {
        let curError: PaymentError = error;
        let translation = this.getErrorDict();

        while (curError?.code && translation?.[curError.code]) {
            translation = translation[curError.code];
            curError = curError.subError;
        }

        if (isObservable(translation)) return translation as Observable<string>;
        return of(getErrorLabel(error));
    }

    private getErrorDict() {
        return {
            failed: this.t.selectTranslate('withdrawalErrorMessage.failed', null, 'wallet-section'),
            authorization_failed: {
                unknown: this.t.selectTranslate(
                    'withdrawalErrorMessage.authorization_failed.unknown',
                    null,
                    'wallet-section',
                ),
            },
        };
    }
}

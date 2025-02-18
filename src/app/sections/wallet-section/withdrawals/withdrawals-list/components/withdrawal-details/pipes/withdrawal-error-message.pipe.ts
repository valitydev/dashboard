import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { AsyncTransform, AsyncTransformParameters } from '@vality/matez';
import { PaymentError } from '@vality/swag-payments';
import lowerCase from 'lodash-es/lowerCase';
import upperFirst from 'lodash-es/upperFirst';
import { isObservable, Observable, of, switchMap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

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
    name: 'withdrawalErrorMessage',
    pure: false,
    standalone: false,
})
export class WithdrawalErrorMessagePipe
    extends AsyncTransform<PaymentError>
    implements PipeTransform
{
    protected result$ = this.params$.pipe(
        switchMap(([errors]) => this.formatErrors(errors)),
        distinctUntilChanged(),
    );

    constructor(private t: TranslocoService) {
        super();
    }

    transform(...params: AsyncTransformParameters) {
        return super.asyncTransform(params as never);
    }

    private formatErrors(error: PaymentError): Observable<string> {
        let curError: PaymentError = error;
        let translation = this.getErrorDict();

        while (curError?.code && translation?.[curError.code]) {
            translation = translation[curError.code];
            curError = curError.subError;
        }

        if (isObservable(translation)) {
            return translation as Observable<string>;
        }
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

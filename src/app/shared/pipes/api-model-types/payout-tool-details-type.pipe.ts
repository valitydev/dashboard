import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';

@Pipe({
    name: 'payoutToolDetailsType',
    standalone: false
})
export class PayoutToolDetailsTypePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(value: string): Observable<string> {
        switch (value) {
            case 'PayoutToolDetailsBankAccount':
                return this.transloco.selectTranslate(
                    'payoutToolDetailsType.payoutToolDetailsBankAccount',
                    null,
                    'pipes',
                );
            case 'PayoutToolDetailsInternationalBankAccount':
                return this.transloco.selectTranslate(
                    'payoutToolDetailsType.payoutToolDetailsInternationalBankAccount',
                    null,
                    'pipes',
                );
            case 'PayoutToolDetailsBankCard':
                return this.transloco.selectTranslate(
                    'payoutToolDetailsType.payoutToolDetailsBankCard',
                    null,
                    'pipes',
                );
            case 'PayoutToolDetailsWalletInfo':
                return this.transloco.selectTranslate(
                    'payoutToolDetailsType.payoutToolDetailsWalletInfo',
                    null,
                    'pipes',
                );
            case 'PayoutToolDetailsPaymentInstitutionAccount':
                return this.transloco.selectTranslate(
                    'payoutToolDetailsType.payoutToolDetailsPaymentInstitutionAccount',
                    null,
                    'pipes',
                );
        }
        return of('');
    }
}

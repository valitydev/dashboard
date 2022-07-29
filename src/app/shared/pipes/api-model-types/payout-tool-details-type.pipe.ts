import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
    name: 'payoutToolDetailsType',
})
export class PayoutToolDetailsTypePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(value: string): string {
        switch (value) {
            case 'PayoutToolDetailsBankAccount':
                return this.transloco.translate('payoutToolDetailsType.payoutToolDetailsBankAccount', null, 'pipes');
            case 'PayoutToolDetailsInternationalBankAccount':
                return this.transloco.translate(
                    'payoutToolDetailsType.payoutToolDetailsInternationalBankAccount',
                    null,
                    'pipes'
                );
            case 'PayoutToolDetailsBankCard':
                return this.transloco.translate('payoutToolDetailsType.payoutToolDetailsBankCard', null, 'pipes');
            case 'PayoutToolDetailsWalletInfo':
                return this.transloco.translate('payoutToolDetailsType.payoutToolDetailsWalletInfo', null, 'pipes');
            case 'PayoutToolDetailsPaymentInstitutionAccount':
                return this.transloco.translate(
                    'payoutToolDetailsType.payoutToolDetailsPaymentInstitutionAccount',
                    null,
                    'pipes'
                );
        }
        return '';
    }
}

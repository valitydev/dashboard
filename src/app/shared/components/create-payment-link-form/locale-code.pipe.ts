import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
    name: 'localeCode',
})
export class LocaleCode implements PipeTransform {
    constructor(private t: TranslocoService) {}

    transform(localeCode: string): string {
        // Duplications for transloco-keys-manager key detection
        switch (localeCode) {
            case 'ru':
                return this.t.translate('createPaymentLinkForm.localeCodes.ru', null, 'components');
            case 'en':
                return this.t.translate('createPaymentLinkForm.localeCodes.en', null, 'components');
            case 'ar':
                return this.t.translate('createPaymentLinkForm.localeCodes.ar', null, 'components');
            case 'az':
                return this.t.translate('createPaymentLinkForm.localeCodes.az', null, 'components');
            case 'bn':
                return this.t.translate('createPaymentLinkForm.localeCodes.bn', null, 'components');
            case 'ja':
                return this.t.translate('createPaymentLinkForm.localeCodes.ja', null, 'components');
            case 'ko':
                return this.t.translate('createPaymentLinkForm.localeCodes.ko', null, 'components');
            case 'pt':
                return this.t.translate('createPaymentLinkForm.localeCodes.pt', null, 'components');
            case 'tr':
                return this.t.translate('createPaymentLinkForm.localeCodes.tr', null, 'components');
            default:
                return localeCode;
        }
    }
}

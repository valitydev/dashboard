import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Pipe({
    name: 'localeCode',
    standalone: false,
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
            case 'pt':
                return this.t.translate('createPaymentLinkForm.localeCodes.pt', null, 'components');
            case 'tj':
                return this.t.translate('createPaymentLinkForm.localeCodes.tj', null, 'components');
            case 'tr':
                return this.t.translate('createPaymentLinkForm.localeCodes.tr', null, 'components');
            case 'uz':
                return this.t.translate('createPaymentLinkForm.localeCodes.uz', null, 'components');
            default:
                return localeCode;
        }
    }
}

import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentsToolDistributionResult } from '@vality/swag-anapi-v2';

@Injectable({
    providedIn: 'root',
})
export class AnapiDictionaryService {
    constructor(private t: TranslocoService) {}

    getPaymentToolLabels(): Record<PaymentsToolDistributionResult['name'], string> {
        return {
            bank_card: this.t.translate('analytics.paymentTool.bank_card', null, 'dictionary'),
            digital_wallet: this.t.translate('analytics.paymentTool.digital_wallet', null, 'dictionary'),
            payment_terminal: this.t.translate('analytics.paymentTool.payment_terminal', null, 'dictionary'),
        };
    }
}

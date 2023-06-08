import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BankCardDetails } from '@vality/swag-payments';

import { TokenProvider, PaymentSystem } from '@dsh/app/api/payments';

interface BankCardIconConfig {
    iconName: string;
    width: string;
    heigth: string;
}

@Component({
    selector: 'dsh-bank-card',
    templateUrl: 'bank-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardComponent {
    @Input() bankCard: BankCardDetails;

    getPaymentSystemIconConfig(paymentSystem: PaymentSystem): BankCardIconConfig {
        switch (paymentSystem) {
            case PaymentSystem.Visa:
                return { iconName: 'visa', width: '32px', heigth: '24px' };
            case PaymentSystem.MasterCard:
                return { iconName: 'mastercard', width: '24px', heigth: '24px' };
            case PaymentSystem.Mir:
                return { iconName: 'mir', width: '32px', heigth: '24px' };
            default:
                return null;
        }
    }

    getTokenProviderIconConfig(tokenProvider: TokenProvider): BankCardIconConfig {
        switch (tokenProvider) {
            case TokenProvider.SamsungPay:
                return { iconName: 'samsung_pay', width: '100px', heigth: '27px' };
            case TokenProvider.GooglePay:
                return { iconName: 'google_pay', width: '40px', heigth: '26px' };
            case TokenProvider.ApplePay:
                return { iconName: 'apple_pay', width: '24px', heigth: '24px' };
            case TokenProvider.YandexPay:
                return { iconName: 'yandex_pay', width: '44px', heigth: '24px' };
            default:
                return null;
        }
    }
}

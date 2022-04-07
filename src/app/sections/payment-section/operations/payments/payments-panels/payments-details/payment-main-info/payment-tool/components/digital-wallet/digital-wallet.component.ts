import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DigitalWalletDetails } from '@vality/swag-payments';

@Component({
    selector: 'dsh-digital-wallet',
    templateUrl: 'digital-wallet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalWalletComponent {
    @Input() digitalWallet: DigitalWalletDetails;
}

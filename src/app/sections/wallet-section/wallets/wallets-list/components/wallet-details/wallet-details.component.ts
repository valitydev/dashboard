import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Wallet } from '@vality/swag-wallets';

@Component({
    selector: 'dsh-wallet-details',
    templateUrl: 'wallet-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WalletDetailsComponent {
    @Input() wallet: Wallet;
}

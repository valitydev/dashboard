import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Wallet } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-wallet-details',
    templateUrl: 'wallet-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletDetailsComponent {
    @Input() wallet: Wallet;
}

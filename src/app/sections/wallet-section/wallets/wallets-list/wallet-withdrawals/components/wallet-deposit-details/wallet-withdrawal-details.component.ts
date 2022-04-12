import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-wallet-withdrawal-details',
    templateUrl: 'wallet-withdrawal-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletWithdrawalDetailsComponent {
    @Input() withdrawal: Withdrawal;
}

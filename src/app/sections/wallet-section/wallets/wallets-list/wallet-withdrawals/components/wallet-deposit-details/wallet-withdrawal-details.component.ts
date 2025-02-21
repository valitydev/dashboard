import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallet';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-wallet-withdrawal-details',
    templateUrl: 'wallet-withdrawal-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WalletWithdrawalDetailsComponent {
    @Input() withdrawal: Withdrawal;

    withdrawalStatusDict$ = this.walletDictionaryService.withdrawalStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

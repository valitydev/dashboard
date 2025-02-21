import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallet';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-withdrawal-row',
    templateUrl: 'withdrawal-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WithdrawalRowComponent {
    @Input() withdrawal: Withdrawal;

    withdrawalStatusDict$ = this.walletDictionaryService.withdrawalStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

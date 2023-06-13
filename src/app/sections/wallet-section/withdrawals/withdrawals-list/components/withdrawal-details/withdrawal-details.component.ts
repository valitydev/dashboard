import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallet';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-withdrawal-details',
    templateUrl: 'withdrawal-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalDetailsComponent {
    @Input() withdrawal: Withdrawal;

    withdrawalStatusDict$ = this.walletDictionaryService.withdrawalStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

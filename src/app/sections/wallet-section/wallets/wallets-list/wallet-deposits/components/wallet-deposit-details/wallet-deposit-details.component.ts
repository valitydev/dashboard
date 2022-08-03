import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Deposit } from '@vality/swag-wallet';

import { WalletDictionaryService } from '@dsh/api/wallet';

@Component({
    selector: 'dsh-wallet-deposit-details',
    templateUrl: 'wallet-deposit-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletDepositDetailsComponent {
    @Input() deposit: Deposit;

    depositStatusDict$ = this.walletDictionaryService.depositStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

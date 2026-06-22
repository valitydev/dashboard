import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WalletDictionaryService } from '@dsh/app/api/wallet';

import { Deposit } from '@vality/swag-wallets';


@Component({
    selector: 'dsh-wallet-deposit-details',
    templateUrl: 'wallet-deposit-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WalletDepositDetailsComponent {
    @Input() deposit: Deposit;

    depositStatusDict$ = this.walletDictionaryService.depositStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Deposit } from '@vality/swag-wallet';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-deposit-details',
    templateUrl: 'deposit-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositDetailsComponent {
    @Input() deposit: Deposit;

    depositStatusDict$ = this.walletDictionaryService.depositStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

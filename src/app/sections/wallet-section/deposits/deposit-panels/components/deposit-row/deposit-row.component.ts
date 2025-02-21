import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Deposit } from '@vality/swag-wallet';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-deposit-row',
    templateUrl: 'deposit-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class DepositRowComponent {
    @Input() deposit: Deposit;

    depositStatusDict$ = this.walletDictionaryService.depositStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

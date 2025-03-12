import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DepositRevert } from '@vality/swag-wallets';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-deposit-revert-details',
    templateUrl: 'deposit-revert-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class DepositRevertDetailsComponent {
    @Input() revert: DepositRevert;
    depositRevertStatusDict$ = this.walletDictionaryService.depositRevertStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

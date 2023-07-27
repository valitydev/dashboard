import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Wallet } from '@vality/swag-wallet';

import { ComponentChanges } from '@dsh/type-utils';

import { FetchWalletAccountService } from '../wallet-account-info/services';

@Component({
    selector: 'dsh-wallet-main-info',
    templateUrl: 'wallets-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchWalletAccountService],
})
export class WalletsMainInfoComponent implements OnChanges {
    @Input() wallet: Wallet;

    walletAccount$ = this.fetchWalletAccountService.walletAccount$;
    isLoading$ = this.fetchWalletAccountService.isLoading$;
    error$ = this.fetchWalletAccountService.error$;

    constructor(private fetchWalletAccountService: FetchWalletAccountService) {}

    ngOnChanges({ wallet }: ComponentChanges<WalletsMainInfoComponent>): void {
        if (wallet?.firstChange && wallet.currentValue) {
            this.fetchWalletAccountService.fetchWalletAccount(this.wallet.id);
        }
    }
}

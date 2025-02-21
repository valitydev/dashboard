import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ComponentChanges } from '@vality/matez';

import { FetchWalletAccountService } from './services';

@Component({
    selector: 'dsh-wallet-account-info',
    templateUrl: 'wallets-account-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchWalletAccountService],
    standalone: false,
})
export class WalletsAccountInfoComponent implements OnChanges {
    @Input() walletID: string;

    walletAccount$ = this.fetchWalletAccountService.walletAccount$;
    isLoading$ = this.fetchWalletAccountService.isLoading$;
    error$ = this.fetchWalletAccountService.error$;

    constructor(private fetchWalletAccountService: FetchWalletAccountService) {}

    ngOnChanges({ walletID }: ComponentChanges<WalletsAccountInfoComponent>): void {
        if (walletID?.firstChange && walletID.currentValue) {
            this.fetchWalletAccountService.fetchWalletAccount(this.walletID);
        }
    }
}

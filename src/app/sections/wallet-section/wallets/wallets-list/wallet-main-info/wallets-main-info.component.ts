import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Wallet } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-wallet-main-info',
    templateUrl: 'wallets-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsMainInfoComponent {
    @Input() wallet: Wallet;
}

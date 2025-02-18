import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-wallet-row',
    templateUrl: 'wallet-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WalletRowComponent {
    @Input() walletName: string;
}

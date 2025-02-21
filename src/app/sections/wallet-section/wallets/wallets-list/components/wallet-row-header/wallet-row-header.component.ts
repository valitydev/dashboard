import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-wallet-row-header',
    templateUrl: 'wallet-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WalletRowHeaderComponent {}

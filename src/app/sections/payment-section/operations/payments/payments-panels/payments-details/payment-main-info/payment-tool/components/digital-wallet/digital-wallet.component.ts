import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DigitalWalletDetails } from '@dsh/api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-digital-wallet',
    templateUrl: 'digital-wallet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalWalletComponent {
    @Input() digitalWallet: DigitalWalletDetails;
}

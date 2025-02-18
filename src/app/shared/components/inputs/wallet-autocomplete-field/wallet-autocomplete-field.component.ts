import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';
import { map } from 'rxjs/operators';

import { WalletsService } from '@dsh/app/api/wallet';

import { WalletId } from './types';
import { walletsToOptions } from './utils';

@Component({
    selector: 'dsh-wallet-autocomplete-field',
    templateUrl: 'wallet-autocomplete-field.component.html',
    providers: createControlProviders(() => WalletAutocompleteFieldComponent),
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WalletAutocompleteFieldComponent extends FormControlSuperclass<WalletId> {
    @Input() label: string;
    @Input({ transform: booleanAttribute }) required = false;

    wallets$ = this.walletService.wallets$;
    options$ = this.wallets$.pipe(map(walletsToOptions));

    constructor(private walletService: WalletsService) {
        super();
    }
}

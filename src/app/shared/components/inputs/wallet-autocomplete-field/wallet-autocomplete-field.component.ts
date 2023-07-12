import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControlSuperclass, provideValueAccessor } from '@vality/ng-core';
import { coerceBoolean } from 'coerce-property';
import { map } from 'rxjs/operators';

import { WalletsService } from '@dsh/app/api/wallet';

import { WalletId } from './types';
import { walletsToOptions } from './utils';

@Component({
    selector: 'dsh-wallet-autocomplete-field',
    templateUrl: 'wallet-autocomplete-field.component.html',
    providers: [provideValueAccessor(() => WalletAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletAutocompleteFieldComponent extends FormControlSuperclass<WalletId> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    wallets$ = this.walletService.wallets$;
    options$ = this.wallets$.pipe(map(walletsToOptions));

    constructor(private walletService: WalletsService) {
        super();
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/matez';
import { WithdrawalStatus } from '@vality/swag-wallets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

import StatusEnum = WithdrawalStatus.StatusEnum;

@Component({
    selector: 'dsh-withdrawal-status-filter',
    templateUrl: './withdrawal-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => WithdrawalStatusFilterComponent),
    standalone: false,
})
export class WithdrawalStatusFilterComponent extends FormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = this.walletDictionaryService.withdrawalStatus$.pipe(
        map((labels) => Object.entries(labels).map(([value, label]) => ({ value, label }))),
    );

    statuses = Object.values(WithdrawalStatus.StatusEnum);
    withdrawalStatusDict$ = this.walletDictionaryService.withdrawalStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {
        super();
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DepositStatus } from '@vality/swag-wallets';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

import { DEPOSIT_STATUSES_LIST } from './consts';
import { DepositStatusFilterValue } from './types/deposit-status-filter-value';

@Component({
    selector: 'dsh-deposit-status-filter',
    templateUrl: './deposit-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class DepositStatusFilterComponent {
    @Input() control: FormControl<DepositStatusFilterValue>;

    statuses: DepositStatus.StatusEnum[] = DEPOSIT_STATUSES_LIST;
    depositStatusDict$ = this.walletDictionaryService.depositStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

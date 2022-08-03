import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { DepositStatus } from '@vality/swag-wallet';

import { WalletDictionaryService } from '@dsh/api/wallet';

import { DEPOSIT_STATUSES_LIST } from './consts';
import { DepositStatusFilterValue } from './types/deposit-status-filter-value';

@Component({
    selector: 'dsh-deposit-status-filter',
    templateUrl: './deposit-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositStatusFilterComponent {
    @Input() control: FormControl<DepositStatusFilterValue>;

    statuses: DepositStatus.StatusEnum[] = DEPOSIT_STATUSES_LIST;
    depositStatusDict$ = this.walletDictionaryService.depositStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

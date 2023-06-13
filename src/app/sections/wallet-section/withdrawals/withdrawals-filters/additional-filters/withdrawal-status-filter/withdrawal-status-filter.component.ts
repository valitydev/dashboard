import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { WithdrawalStatus } from '@vality/swag-wallet';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WalletDictionaryService } from '@dsh/app/api/wallet';
import { Option } from '@dsh/components/form-controls/radio-group-field';
import { provideValueAccessor } from '@dsh/utils';

import StatusEnum = WithdrawalStatus.StatusEnum;

@Component({
    selector: 'dsh-withdrawal-status-filter',
    templateUrl: './withdrawal-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => WithdrawalStatusFilterComponent)],
})
export class WithdrawalStatusFilterComponent extends WrappedFormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = this.walletDictionaryService.withdrawalStatus$.pipe(
        map((labels) => Object.entries(labels).map(([value, label]) => ({ value, label })))
    );

    statuses = Object.values(WithdrawalStatus.StatusEnum);
    withdrawalStatusDict$ = this.walletDictionaryService.withdrawalStatus$;

    constructor(private walletDictionaryService: WalletDictionaryService) {
        super();
    }
}

import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DepositRevert } from '@vality/swag-wallet';
import { Deposit } from '@vality/swag-wallet/lib/model/deposit';
import { DestinationsTopic } from '@vality/swag-wallet/lib/model/destinationsTopic';
import { Withdrawal } from '@vality/swag-wallet/lib/model/withdrawal';
import { WithdrawalsTopic } from '@vality/swag-wallet/lib/model/withdrawalsTopic';

import { DictionaryService } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WalletDictionaryService {
    withdrawalsTopicEventType$ = this.dictionaryService.create<WithdrawalsTopic.EventTypesEnum>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        WithdrawalStarted: this.t.translate('wallet.withdrawalsTopicEventType.WithdrawalStarted', null, 'dictionary'),
        WithdrawalSucceeded: this.t.translate(
            'wallet.withdrawalsTopicEventType.WithdrawalSucceeded',
            null,
            'dictionary'
        ),
        WithdrawalFailed: this.t.translate('wallet.withdrawalsTopicEventType.WithdrawalFailed', null, 'dictionary'),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    destinationsTopicEventType$ = this.dictionaryService.create<DestinationsTopic.EventTypesEnum>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        DestinationCreated: this.t.translate(
            'wallet.destinationsTopicEventType.DestinationCreated',
            null,
            'dictionary'
        ),
        DestinationUnauthorized: this.t.translate(
            'wallet.destinationsTopicEventType.DestinationUnauthorized',
            null,
            'dictionary'
        ),
        DestinationAuthorized: this.t.translate(
            'wallet.destinationsTopicEventType.DestinationAuthorized',
            null,
            'dictionary'
        ),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    depositRevertStatus$ = this.dictionaryService.create<DepositRevert.StatusEnum>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        Pending: this.t.translate('wallet.depositRevertStatus.Pending', null, 'dictionary'),
        Succeeded: this.t.translate('wallet.depositRevertStatus.Succeeded', null, 'dictionary'),
        Failed: this.t.translate('wallet.depositRevertStatus.Failed', null, 'dictionary'),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    depositStatus$ = this.dictionaryService.create<Deposit.StatusEnum>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        Pending: this.t.translate('wallet.depositStatus.Pending', null, 'dictionary'),
        Succeeded: this.t.translate('wallet.depositStatus.Succeeded', null, 'dictionary'),
        Failed: this.t.translate('wallet.depositStatus.Failed', null, 'dictionary'),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    withdrawalStatus$ = this.dictionaryService.create<Withdrawal.StatusEnum>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        Pending: this.t.translate('wallet.withdrawalStatus.Pending', null, 'dictionary'),
        Succeeded: this.t.translate('wallet.withdrawalStatus.Succeeded', null, 'dictionary'),
        Failed: this.t.translate('wallet.withdrawalStatus.Failed', null, 'dictionary'),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    constructor(private t: TranslocoService, private dictionaryService: DictionaryService) {}
}

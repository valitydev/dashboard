import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DestinationsTopic } from '@vality/swag-wallet/lib/model/destinationsTopic';
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

    constructor(private t: TranslocoService, private dictionaryService: DictionaryService) {}
}

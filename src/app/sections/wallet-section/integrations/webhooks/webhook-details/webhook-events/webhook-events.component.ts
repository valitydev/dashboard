import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DestinationsTopic, WebhookScope, WithdrawalsTopic } from '@vality/swag-wallet';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { WalletDictionaryService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-webhook-events',
    templateUrl: 'webhook-events.component.html',
    styleUrls: ['webhook-events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WebhookEventsComponent {
    @Input()
    scope: WebhookScope;

    eventType$ = combineLatest([
        this.walletDictionaryService.withdrawalsTopicEventType$,
        this.walletDictionaryService.destinationsTopicEventType$,
    ]).pipe(map(([w, d]) => ({ ...w, ...d })));

    get events(): WithdrawalsTopic.EventTypesEnum[] | DestinationsTopic.EventTypesEnum[] {
        switch (this.scope.topic) {
            case 'WithdrawalsTopic':
                return (this.scope as unknown as WithdrawalsTopic).eventTypes;
            case 'DestinationsTopic':
                return (this.scope as unknown as DestinationsTopic).eventTypes;
        }
    }

    constructor(private walletDictionaryService: WalletDictionaryService) {}
}

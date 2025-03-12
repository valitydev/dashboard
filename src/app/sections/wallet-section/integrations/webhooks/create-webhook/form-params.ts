import { DestinationsTopic, WebhookScope, WithdrawalsTopic } from '@vality/swag-wallets';

import TopicEnum = WebhookScope.TopicEnum;

interface EventType {
    eventName: WithdrawalsTopic.EventTypesEnum | DestinationsTopic.EventTypesEnum;
    selected: boolean;
}

export interface FormParams {
    identityID: string;
    url: string;
    walletID?: string;
    eventType: TopicEnum;
    eventTypes: EventType[];
}

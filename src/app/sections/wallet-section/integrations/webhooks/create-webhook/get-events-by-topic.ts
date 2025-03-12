import { DestinationsTopic, WebhookScope, WithdrawalsTopic } from '@vality/swag-wallets';

import TopicEnum = WebhookScope.TopicEnum;

export const getEventsByTopic = (topic: TopicEnum): string[] => {
    switch (topic) {
        case 'WithdrawalsTopic':
            return Object.values(WithdrawalsTopic.EventTypesEnum);
        case 'DestinationsTopic':
            return Object.values(DestinationsTopic.EventTypesEnum);
    }
};

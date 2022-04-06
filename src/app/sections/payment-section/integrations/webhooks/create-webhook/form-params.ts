import { CustomersTopic, InvoicesTopic, WebhookScope } from '@vality/swag-payments';

import TopicEnum = WebhookScope.TopicEnum;

interface EventType {
    eventName: InvoicesTopic.EventTypesEnum | CustomersTopic.EventTypesEnum;
    selected: boolean;
}

export interface FormParams {
    shopID: string;
    url: string;
    eventType: TopicEnum;
    eventTypes: EventType[];
}

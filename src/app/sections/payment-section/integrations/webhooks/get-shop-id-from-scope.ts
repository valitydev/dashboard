import { InvoicesTopic, WebhookScope } from '@vality/swag-payments';

export const getShopIdFromScope = (scope: WebhookScope): string | null =>
    (scope as InvoicesTopic)?.shopID;

import { CustomersTopic, InvoicesTopic, WebhookScope } from '@vality/swag-payments';

export const getShopIdFromScope = (scope: WebhookScope): string | null =>
    (scope as InvoicesTopic).shopID || (scope as CustomersTopic).shopID;

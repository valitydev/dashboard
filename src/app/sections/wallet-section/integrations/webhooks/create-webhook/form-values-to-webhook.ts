import { Webhook } from '@vality/swag-wallets';

import { FormParams } from './form-params';

export const formValuesToWebhook = (v: FormParams, partyID: string): Webhook =>
    ({
        url: v.url,
        partyID: partyID,
        scope: {
            ...(v.walletID ? { walletID: v.walletID } : {}),
            eventTypes: v.eventTypes.filter((e) => e.selected).map((e) => e.eventName),
            topic: v.eventType,
        },
    }) as Webhook;

import { Injectable, Injector } from '@angular/core';
import { WebhooksService as ApiWebhooksService } from '@vality/swag-wallet';

import { PartyIdExtension, PartyIdPatchMethodService } from '@dsh/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WebhooksService extends createApi(ApiWebhooksService, [PartyIdExtension]) {
    constructor(injector: Injector, partyIdPatchMethodService: PartyIdPatchMethodService) {
        super(injector);
        this.createWebhook = partyIdPatchMethodService.patch(this.createWebhook, (params, partyID) => ({
            ...params,
            webhookParams: { ...params.webhookParams, partyID },
        }));
    }
}

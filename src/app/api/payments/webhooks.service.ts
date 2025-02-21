import { Injectable, Injector } from '@angular/core';
import { WebhooksService as ApiWebhooksService } from '@vality/swag-payments';

import { PartyIdExtension, PartyIdPatchMethodService } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WebhooksService extends createApi(ApiWebhooksService, [PartyIdExtension]) {
    constructor(injector: Injector, partyIdPatchMethodService: PartyIdPatchMethodService) {
        super(injector);
        this.createWebhook = partyIdPatchMethodService.patch(
            this.createWebhook,
            (params, partyID) => (params.webhookParams.partyID = partyID),
        );
    }
}

import { Injectable } from '@angular/core';
import { WebhooksService as ApiWebhooksService } from '@vality/swag-wallets';

import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WebhooksService extends createApi(ApiWebhooksService, [PartyIdExtension]) {}

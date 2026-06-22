import { Injectable } from '@angular/core';
import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { WebhooksService as ApiWebhooksService } from '@vality/swag-wallets';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WebhooksService extends createApi(ApiWebhooksService, [PartyIdExtension]) {}

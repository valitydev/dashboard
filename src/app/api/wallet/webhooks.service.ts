import { Injectable } from '@angular/core';
import { WebhooksService as ApiWebhooksService } from '@vality/swag-wallet';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WebhooksService extends createApi(ApiWebhooksService) {}

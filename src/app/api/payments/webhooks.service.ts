import { Injectable } from '@angular/core';
import { Webhook, WebhooksService as ApiWebhooksService } from '@vality/swag-payments';
import { Observable } from 'rxjs';

import { IdGeneratorService } from '@dsh/app/shared';

import { createDefaultHeaders } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WebhooksService {
    constructor(private webhooksService: ApiWebhooksService, private idGenerator: IdGeneratorService) {
        this.webhooksService.defaultHeaders = createDefaultHeaders();
    }

    createWebhook(webhookParams: Webhook) {
        return this.webhooksService.createWebhook({ xRequestID: this.idGenerator.shortUuid(), webhookParams });
    }

    getWebhooks() {
        return this.webhooksService.getWebhooks({ xRequestID: this.idGenerator.shortUuid() });
    }

    getWebhookByID(webhookID: string) {
        return this.webhooksService.getWebhookByID({ xRequestID: this.idGenerator.shortUuid(), webhookID });
    }

    deleteWebhookByID(webhookID: string): Observable<void> {
        return this.webhooksService.deleteWebhookByID({ xRequestID: this.idGenerator.shortUuid(), webhookID });
    }
}

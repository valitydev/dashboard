import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Webhook, WebhooksService as ApiWebhooksService } from '@dsh/api-codegen/capi';
import { IdGeneratorService } from '@dsh/app/shared';

@Injectable()
export class WebhooksService {
    constructor(private apiWebhooksService: ApiWebhooksService, private idGenerator: IdGeneratorService) {}

    createWebhook(params: Webhook): Observable<Webhook> {
        return this.apiWebhooksService.createWebhook(this.idGenerator.shortUuid(), params);
    }

    getWebhooks(): Observable<Webhook[]> {
        return this.apiWebhooksService.getWebhooks(this.idGenerator.shortUuid());
    }

    getWebhookByID(webhookID: string): Observable<Webhook> {
        return this.apiWebhooksService.getWebhookByID(this.idGenerator.shortUuid(), webhookID);
    }

    deleteWebhookByID(webhookID: string): Observable<any> {
        return this.apiWebhooksService.deleteWebhookByID(this.idGenerator.shortUuid(), webhookID);
    }
}

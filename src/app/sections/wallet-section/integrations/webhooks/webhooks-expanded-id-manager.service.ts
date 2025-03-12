import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Webhook } from '@vality/swag-wallets';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { ReceiveWebhooksService } from './receive-webhooks.service';

@Injectable()
export class WebhooksExpandedIdManager extends ExpandedIdManager<Webhook> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private receiveWebhooksService: ReceiveWebhooksService,
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Webhook[]> {
        return this.receiveWebhooksService.webhooks$;
    }
}

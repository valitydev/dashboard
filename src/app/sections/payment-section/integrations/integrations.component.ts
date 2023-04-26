import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    templateUrl: 'integrations.component.html',
})
export class IntegrationsComponent {
    links = [
        {
            path: 'payment-link',
            label$: this.transloco.selectTranslate('integrations.tabs.payment-link', null, 'payment-section'),
        },
        {
            path: 'api-keys',
            label$: this.transloco.selectTranslate('integrations.tabs.api-keys', null, 'payment-section'),
        },
        {
            path: 'webhooks',
            label$: this.transloco.selectTranslate('integrations.tabs.webhooks', null, 'payment-section'),
        },
    ];

    constructor(private transloco: TranslocoService) {}
}

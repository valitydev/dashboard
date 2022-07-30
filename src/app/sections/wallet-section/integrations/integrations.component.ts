import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    templateUrl: 'integrations.component.html',
})
export class IntegrationsComponent {
    links = [
        {
            path: 'webhooks',
            label$: this.transloco.selectTranslate('integrations.tabs.webhooks', null, 'wallet-section'),
        },
    ];

    constructor(private transloco: TranslocoService) {}
}

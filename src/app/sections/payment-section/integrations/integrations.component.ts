import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

import { RoleAccessName } from '@dsh/app/auth';

@Component({
    templateUrl: 'integrations.component.html',
    standalone: false,
})
export class IntegrationsComponent {
    links = [
        {
            path: 'payment-link',
            label$: this.transloco.selectTranslate(
                'integrations.tabs.payment-link',
                null,
                'payment-section',
            ),
            roles: [RoleAccessName.PaymentLinks],
        },
        {
            path: 'api-keys',
            label$: this.transloco.selectTranslate(
                'integrations.tabs.api-keys',
                null,
                'payment-section',
            ),
            roles: [RoleAccessName.ApiKeys],
        },
        {
            path: 'webhooks',
            label$: this.transloco.selectTranslate(
                'integrations.tabs.webhooks',
                null,
                'payment-section',
            ),
            roles: [RoleAccessName.Webhooks],
        },
    ];

    constructor(private transloco: TranslocoService) {}
}

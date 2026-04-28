import { Component, isDevMode } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { map } from 'rxjs';

import { RoleAccessName } from '@dsh/app/auth';

@Component({
    templateUrl: 'integrations.component.html',
    standalone: false,
})
export class IntegrationsComponent {
    links = [
        isDevMode() && {
            path: 'payment-link',
            label$: this.transloco
                .selectTranslate('integrations.tabs.payment-link', null, 'payment-section')
                .pipe(map((label) => `${label} (dev)`)),
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

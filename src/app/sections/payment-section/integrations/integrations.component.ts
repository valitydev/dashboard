import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoleAccessName } from '@dsh/app/auth';
import { TranslocoService } from '@jsverse/transloco';


@Component({
    templateUrl: 'integrations.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class IntegrationsComponent {
    links = [
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

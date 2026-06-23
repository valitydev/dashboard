import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
    templateUrl: 'integrations.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class IntegrationsComponent {
    links = [
        {
            path: 'webhooks',
            label$: this.transloco.selectTranslate(
                'integrations.tabs.webhooks',
                null,
                'wallet-section',
            ),
        },
    ];

    constructor(private transloco: TranslocoService) {}
}

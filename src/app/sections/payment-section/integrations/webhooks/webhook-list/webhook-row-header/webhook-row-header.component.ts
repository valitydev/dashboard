import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-webhook-row-header',
    templateUrl: 'webhook-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WebhookRowHeaderComponent {}

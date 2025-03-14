import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-webhook-row',
    templateUrl: 'webhook-row.component.html',
    styleUrls: ['webhook-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WebhookRowComponent {
    @Input() url: string;
    @Input() identityID: string;
}

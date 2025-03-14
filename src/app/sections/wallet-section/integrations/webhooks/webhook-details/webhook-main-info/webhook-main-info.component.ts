import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-webhook-main-info',
    templateUrl: 'webhook-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WebhookMainInfoComponent {
    @Input()
    url: string;

    @Input()
    identityID: string;

    @Input()
    identityName: string;

    @Input()
    walletName: string;
}

import { Component, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { NotificationService } from '@dsh/app/shared';

@Component({
    selector: 'dsh-webhook-api-key',
    templateUrl: 'webhook-api-key.component.html',
    styleUrls: ['webhook-api-key.component.scss'],
})
export class WebhookApiKeyComponent {
    @Input()
    key: string;

    constructor(private notificationService: NotificationService, private transloco: TranslocoService) {}

    copied(isCopied: boolean): void {
        if (isCopied) this.notificationService.success(this.transloco.translate('copied'));
        else this.notificationService.success(this.transloco.translate('copyFailed'));
    }
}

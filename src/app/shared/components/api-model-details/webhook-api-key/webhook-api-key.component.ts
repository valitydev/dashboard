import { Component, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';

@Component({
    selector: 'dsh-webhook-api-key',
    templateUrl: 'webhook-api-key.component.html',
    styleUrls: ['webhook-api-key.component.scss'],
})
export class WebhookApiKeyComponent {
    @Input()
    key: string;

    constructor(
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {}

    copied(isCopied: boolean): void {
        if (isCopied) {
            this.log.success(this.transloco.selectTranslate('shared.copied', null, 'components'));
        } else {
            this.log.success(
                this.transloco.selectTranslate('shared.copyFailed', null, 'components'),
            );
        }
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { NotificationService } from '@dsh/app/shared';

@Component({
    selector: 'dsh-shop-id',
    templateUrl: 'shop-id.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopIdComponent {
    @Input() id: string;

    constructor(
        private notificationService: NotificationService,
        private transloco: TranslocoService,
    ) {}

    copied(isCopied: boolean): void {
        if (isCopied)
            this.notificationService.success(
                this.transloco.translate('shared.copied', null, 'components'),
            );
        else
            this.notificationService.success(
                this.transloco.translate('shared.copyFailed', null, 'components'),
            );
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';

@Component({
    selector: 'dsh-shop-id',
    templateUrl: 'shop-id.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ShopIdComponent {
    @Input() id: string;

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

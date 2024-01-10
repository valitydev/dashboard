import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotifyLogService } from '@vality/ng-core';

import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';

@UntilDestroy()
@Component({
    selector: 'dsh-create-russian-shop-entity',
    templateUrl: 'create-russian-shop-entity.component.html',
    styleUrls: ['create-russian-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateRussianShopEntityService],
})
export class CreateRussianShopEntityComponent {
    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    form = new FormControl();

    constructor(
        private createShopRussianLegalEntityService: CreateRussianShopEntityService,
        private transloco: TranslocoService,
        private log: NotifyLogService,
        private router: Router,
    ) {}

    cancelCreation(): void {
        this.cancel.emit();
    }

    createShop(): void {
        this.createShopRussianLegalEntityService
            .createShop(this.form.value)
            .pipe(untilDestroyed(this))
            .subscribe({
                next: () => {
                    this.send.emit();
                    // TODO: Claims page disabled
                    // void this.router.navigate(['claim-section', 'claims', id]);
                },
                error: (err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate('shared.commonError', null, 'components'),
                    );
                },
            });
    }
}

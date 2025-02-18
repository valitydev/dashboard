import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { progressTo, NotifyLogService } from '@vality/matez';
import { BehaviorSubject, first } from 'rxjs';

import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalShopEntityFormValue } from './types/international-shop-entity-form-value';

@Component({
    selector: 'dsh-create-international-shop-entity',
    templateUrl: 'create-international-shop-entity.component.html',
    styleUrls: ['create-international-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class CreateInternationalShopEntityComponent {
    @Output() send = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    progress$ = new BehaviorSubject(0);
    form = new FormControl<InternationalShopEntityFormValue>(null);

    constructor(
        private createShopInternationalLegalEntityService: CreateInternationalShopEntityService,
        private transloco: TranslocoService,
        private log: NotifyLogService,
        private dr: DestroyRef,
    ) {}

    createShop(): void {
        this.createShopInternationalLegalEntityService
            .createShop(this.form.value)
            .pipe(progressTo(this.progress$), first(), takeUntilDestroyed(this.dr))
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

    cancelCreation(): void {
        this.cancel.emit();
    }
}

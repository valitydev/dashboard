import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { progressTo } from '@vality/ng-core';
import { BehaviorSubject, first } from 'rxjs';

import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalShopEntityFormValue } from './types/international-shop-entity-form-value';

@UntilDestroy()
@Component({
    selector: 'dsh-create-international-shop-entity',
    templateUrl: 'create-international-shop-entity.component.html',
    styleUrls: ['create-international-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInternationalShopEntityComponent {
    @Output() send = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    progress$ = new BehaviorSubject(0);
    form = new FormControl<InternationalShopEntityFormValue>(null);

    constructor(
        private createShopInternationalLegalEntityService: CreateInternationalShopEntityService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    createShop(): void {
        this.createShopInternationalLegalEntityService
            .createShop(this.form.value)
            .pipe(progressTo(this.progress$), first(), untilDestroyed(this))
            .subscribe(
                () => {
                    this.send.emit();
                    void this.router.navigate(['claim-section', 'claims']);
                },
                (err) => {
                    console.error(err);
                    this.snackBar.open(this.transloco.translate('shared.commonError', null, 'components'), 'OK');
                }
            );
    }

    cancelCreation(): void {
        this.cancel.emit();
    }
}

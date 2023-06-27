import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { createTypeUnionDefaultForm } from '../../../created-existing-switch/created-existing-switch.component';
import { RussianShopForm } from '../../types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopFormComponent),
})
export class ShopFormComponent extends ValidatedControlSuperclass<Partial<RussianShopForm>> {
    control = this.fb.group({
        shopDetails: null,
        orgDetails: null,
        bankAccount: createTypeUnionDefaultForm(),
        paymentInstitution: null,
        currency: null,
    }) as FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }
}

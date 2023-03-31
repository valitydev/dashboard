import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createTypeUnionDefaultForm } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';

@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopFormComponent),
})
export class ShopFormComponent extends ValidatedControlSuperclass<InternationalShopEntityFormValue> {
    control = this.fb.group<InternationalShopEntityFormValue>({
        shopDetails: null,
        orgDetails: createTypeUnionDefaultForm(),
        paymentInstitution: null,
        bankAccount: createTypeUnionDefaultForm(),
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

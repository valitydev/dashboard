import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/ng-core';

import { createTypeUnionDefaultForm } from '../../../created-existing-switch/created-existing-switch.component';
import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';

@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopFormComponent),
})
export class ShopFormComponent extends FormGroupSuperclass<
    Partial<InternationalShopEntityFormValue>
> {
    control = this.fb.group({
        shopDetails: null,
        orgDetails: createTypeUnionDefaultForm(),
        paymentInstitution: null,
    }) as FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }
}

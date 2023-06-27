import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from '@vality/swag-payments';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

export interface ShopDetailsForm {
    name: string;
    url: string;
    category?: Category;
}

@Component({
    selector: 'dsh-shop-details-form',
    templateUrl: 'shop-details-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopDetailsFormComponent),
})
export class ShopDetailsFormComponent extends ValidatedControlSuperclass<Partial<ShopDetailsForm>> {
    control = this.fb.group<ShopDetailsForm>({
        url: '',
        name: '',
        category: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

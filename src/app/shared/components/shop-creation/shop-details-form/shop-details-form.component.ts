import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createControlProviders, FormGroupSuperclass } from '@vality/matez';
import { Category } from '@vality/swag-payments';

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
    standalone: false,
})
export class ShopDetailsFormComponent extends FormGroupSuperclass<Partial<ShopDetailsForm>> {
    control = this.fb.group<ShopDetailsForm>({
        url: '',
        name: '',
        category: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}

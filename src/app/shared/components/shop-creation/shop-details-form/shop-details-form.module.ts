import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslocoModule } from '@ngneat/transloco';

import { CategoryAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/category-autocomplete-field';

import { ShopDetailsFormComponent } from './shop-details-form.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        CategoryAutocompleteFieldModule,
        TranslocoModule,
        FlexModule,
    ],
    declarations: [ShopDetailsFormComponent],
    exports: [ShopDetailsFormComponent],
})
export class ShopDetailsFormModule {}

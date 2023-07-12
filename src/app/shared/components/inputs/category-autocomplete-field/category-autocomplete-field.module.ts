import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectFieldModule } from '@vality/ng-core';

import { CategoryAutocompleteFieldComponent } from './category-autocomplete-field.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, SelectFieldModule],
    declarations: [CategoryAutocompleteFieldComponent],
    exports: [CategoryAutocompleteFieldComponent],
})
export class CategoryAutocompleteFieldModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { SelectSearchFieldModule } from '@dsh/components/form-controls/select-search-field';

import { CategoryAutocompleteFieldComponent } from './category-autocomplete-field.component';

@NgModule({
    imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, SelectSearchFieldModule],
    declarations: [CategoryAutocompleteFieldComponent],
    exports: [CategoryAutocompleteFieldComponent],
})
export class CategoryAutocompleteFieldModule {}

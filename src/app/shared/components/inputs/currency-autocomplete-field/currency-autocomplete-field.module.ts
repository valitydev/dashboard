import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { SelectFieldModule } from '@vality/ng-core';

import { CurrencyAutocompleteFieldComponent } from './currency-autocomplete-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, SelectFieldModule],
    declarations: [CurrencyAutocompleteFieldComponent],
    exports: [CurrencyAutocompleteFieldComponent],
})
export class CurrencyAutocompleteFieldModule {}

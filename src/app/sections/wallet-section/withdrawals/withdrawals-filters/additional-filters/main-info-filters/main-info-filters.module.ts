import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslocoModule } from '@ngneat/transloco';

import { WalletAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/wallet-autocomplete-field';

import { MainInfoFiltersComponent } from './main-info-filters.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        WalletAutocompleteFieldModule,
    ],
    declarations: [MainInfoFiltersComponent],
    exports: [MainInfoFiltersComponent],
})
export class MainInfoFiltersModule {}

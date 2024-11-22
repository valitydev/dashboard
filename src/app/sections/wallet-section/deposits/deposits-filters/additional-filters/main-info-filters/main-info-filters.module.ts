import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

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

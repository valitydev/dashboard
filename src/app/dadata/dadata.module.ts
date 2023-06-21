import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { FormControlsModule } from '@dsh/components/form-controls';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { DaDataAutocompleteComponent } from './dadata.component';
import { HighlightSearchPipe } from './highlight.pipe';

@NgModule({
    imports: [
        HttpClientModule,
        MatAutocompleteModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        FormControlsModule,
        BootstrapIconModule,
        MatButtonModule,
    ],
    declarations: [DaDataAutocompleteComponent, HighlightSearchPipe],
    exports: [DaDataAutocompleteComponent],
})
export class DaDataModule {}

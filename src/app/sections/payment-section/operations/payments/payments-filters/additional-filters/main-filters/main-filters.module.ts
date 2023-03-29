import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslocoModule } from '@ngneat/transloco';

import { MainFiltersComponent } from './main-filters.component';

@NgModule({
    imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FlexLayoutModule, TranslocoModule],
    declarations: [MainFiltersComponent],
    exports: [MainFiltersComponent],
})
export class MainFiltersModule {}

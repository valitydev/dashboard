import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { MultiInputFieldComponent } from './multi-input-field.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        BootstrapIconModule,
    ],
    declarations: [MultiInputFieldComponent],
    exports: [MultiInputFieldComponent],
})
export class MultiInputFieldModule {}

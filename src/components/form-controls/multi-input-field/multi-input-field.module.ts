import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from 'ng-flex-layout';

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

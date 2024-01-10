import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from 'ng-flex-layout';

import { MultiSelectFieldComponent } from './multi-select-field.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
    ],
    declarations: [MultiSelectFieldComponent],
    exports: [MultiSelectFieldComponent],
})
export class MultiSelectFieldModule {}

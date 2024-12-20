import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

import { MultiSelectFieldModule } from '@dsh/components/form-controls/multi-select-field';

import { ShopsFieldComponent } from './shops-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, MultiSelectFieldModule, ReactiveFormsModule],
    declarations: [ShopsFieldComponent],
    exports: [ShopsFieldComponent],
})
export class ShopsFieldModule {}

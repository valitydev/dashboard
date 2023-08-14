import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectFieldModule } from '@vality/ng-core';

import { ShopFieldComponent } from './shop-field.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, SelectFieldModule],
    declarations: [ShopFieldComponent],
    exports: [ShopFieldComponent],
})
export class ShopFieldModule {}

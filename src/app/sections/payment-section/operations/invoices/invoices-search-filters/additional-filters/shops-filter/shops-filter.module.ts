import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShopsFieldModule } from '@dsh/app/shared/components/inputs/shops-field';
import { TranslocoModule } from '@jsverse/transloco';


import { ShopsFilterComponent } from './shops-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        MatFormFieldModule,
        ShopsFieldModule,
    ],
    declarations: [ShopsFilterComponent],
    exports: [ShopsFilterComponent],
})
export class ShopsFilterModule {}

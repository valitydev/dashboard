import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ShopsFieldModule } from '@dsh/app/shared/components/inputs/shops-field';
import { FormatInputModule } from '@dsh/components/form-controls';

import { ShopsFilterComponent } from './shops-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormatInputModule,
        FlexLayoutModule,
        TranslocoModule,
        MatFormFieldModule,
        ShopsFieldModule,
    ],
    declarations: [ShopsFilterComponent],
    exports: [ShopsFilterComponent],
})
export class ShopsFilterModule {}

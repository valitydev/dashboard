import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { CardBinPanFilterModule } from '../../card-bin-pan-filter';

import { CardFilterComponent } from './card-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        CardBinPanFilterModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [CardFilterComponent],
    exports: [CardFilterComponent],
})
export class CardFilterModule {}

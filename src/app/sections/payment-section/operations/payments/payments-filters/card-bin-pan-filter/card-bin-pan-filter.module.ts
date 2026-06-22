import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FilterModule } from '@dsh/components/filter';
import { TranslocoModule } from '@jsverse/transloco';

import { CardBinPanFilterComponent } from './card-bin-pan-filter.component';
import { CardBinPanLabelPipe } from './pipes/card-bin-pan-label.pipe';

@NgModule({
    imports: [
        CommonModule,
        FilterModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        TranslocoModule,
        FlexLayoutModule,
        MatInputModule,
    ],
    declarations: [CardBinPanFilterComponent, CardBinPanLabelPipe],
    exports: [CardBinPanFilterComponent, CardBinPanLabelPipe],
})
export class CardBinPanFilterModule {}

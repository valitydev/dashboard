import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from '@dsh/components/filter';
import { TranslocoModule } from '@jsverse/transloco';

import { CurrencyFieldModule } from '../../inputs/currency-field';

import { CurrencyFilterComponent } from './currency-filter.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FilterModule,
        CurrencyFieldModule,
        ReactiveFormsModule,
    ],
    declarations: [CurrencyFilterComponent],
    exports: [CurrencyFilterComponent],
})
export class CurrencyFilterModule {}

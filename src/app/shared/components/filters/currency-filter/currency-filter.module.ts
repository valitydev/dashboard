import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterModule } from '@dsh/components/filter';

import { CurrencyFilterComponent } from './currency-filter.component';
import { CurrencyFieldModule } from '../../inputs/currency-field';

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

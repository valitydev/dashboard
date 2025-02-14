import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

import { InvoicesFieldModule } from '@dsh/app/shared/components/inputs/invoices-field';
import { FilterModule } from '@dsh/components/filter';

import { InvoicesFilterComponent } from './invoices-filter.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        InvoicesFieldModule,
        ReactiveFormsModule,
        FilterModule,
    ],
    declarations: [InvoicesFilterComponent],
    exports: [InvoicesFilterComponent],
})
export class InvoicesFilterModule {}

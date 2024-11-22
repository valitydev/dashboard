import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { InvoicesFieldModule } from '@dsh/app/shared/components/inputs/invoices-field';

import { InvoicesFilterComponent } from './invoices-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        InvoicesFieldModule,
    ],
    declarations: [InvoicesFilterComponent],
    exports: [InvoicesFilterComponent],
})
export class InvoicesFilterModule {}

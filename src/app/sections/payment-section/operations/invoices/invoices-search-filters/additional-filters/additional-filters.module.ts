import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';

import { DialogFiltersComponent } from './components';
import { InvoiceStatusFilterModule } from './invoice-status-filter';
import { InvoicesFilterModule } from './invoices-filter';
import { ShopsFilterModule } from './shops-filter';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        MatButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatIconModule,
        InvoiceStatusFilterModule,
        MatDividerModule,
        InvoicesFilterModule,
        ShopsFilterModule,
    ],
    declarations: [DialogFiltersComponent],
})
export class AdditionalFiltersModule {}

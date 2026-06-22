import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { TranslocoModule } from '@jsverse/transloco';

import { DialogFiltersComponent } from './components';
import { InvoicesFilterModule } from './invoices-filter';
import { RefundStatusFilterModule } from './refund-status-filter';
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
        RefundStatusFilterModule,
        MatDividerModule,
        InvoicesFilterModule,
        ShopsFilterModule,
    ],
    declarations: [DialogFiltersComponent],
})
export class AdditionalFiltersModule {}

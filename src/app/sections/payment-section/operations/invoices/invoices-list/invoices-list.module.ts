import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceDetailsModule as ApiInvoiceDetailsModule } from '@dsh/app/shared/components';
import { ApiModelRefsModule, AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceRowHeaderComponent } from './components/invoice-row-header/invoice-row-header.component';
import { InvoiceRowComponent } from './components/invoice-row/invoice-row.component';
import { InvoiceDetailsModule } from './invoice-details';
import { InvoicesListComponent } from './invoices-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,

        ApiModelRefsModule,
        InvoiceDetailsModule,
        InvoiceDetailsModule,
        ApiInvoiceDetailsModule,
        AmountCurrencyModule,
    ],
    declarations: [InvoicesListComponent, InvoiceRowHeaderComponent, InvoiceRowComponent],
    exports: [InvoicesListComponent],
})
export class InvoicesListModule {}

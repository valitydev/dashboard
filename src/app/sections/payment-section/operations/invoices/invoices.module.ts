import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { AuthModule } from '@dsh/app/auth';
import { InvoiceDetailsModule } from '@dsh/app/shared/components';
import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { FormControlsModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { CreateInvoiceModule } from './create-invoice';
import { InvoicesListModule } from './invoices-list';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesSearchFiltersModule } from './invoices-search-filters';
import { InvoicesComponent } from './invoices.component';

@NgModule({
    imports: [
        CommonModule,
        InvoicesRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormControlsModule,
        IndicatorsModule,

        MatSnackBarModule,
        StateNavModule,
        TranslocoModule,
        MatMenuModule,
        EmptySearchResultModule,
        MatDialogModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatDividerModule,
        CreateInvoiceModule,
        InvoicesSearchFiltersModule,
        InvoiceDetailsModule,
        InvoicesListModule,
        ShowMorePanelModule,
        AuthModule,
    ],
    declarations: [InvoicesComponent],
})
export class InvoicesModule {}

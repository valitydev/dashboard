import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule, ExtendedModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { IdentityFilterModule } from '@dsh/app/shared';
import { AccordionTableModule } from '@dsh/app/shared/components/accordion-table';
import { DialogModule } from '@dsh/app/shared/components/dialog';
import { ClaimFieldModule } from '@dsh/app/shared/components/inputs/claim-field';
import { IdentityFieldComponent } from '@dsh/app/shared/components/inputs/identity-field';
import { ButtonModule } from '@dsh/components/buttons';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { CreateReportDialogComponent } from './components/create-report-dialog/create-report-dialog.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
    declarations: [ReportsComponent, CreateReportDialogComponent],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        AccordionTableModule,
        FlexModule,
        DateRangeFilterModule,
        FiltersGroupModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        ClaimFieldModule,
        FilterModule,
        TranslocoModule,
        IdentityFilterModule,
        ButtonModule,
        GridModule,
        ExtendedModule,
        DialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogModule,
        IdentityFieldComponent,
        BootstrapIconModule,
    ],
})
export class ReportsModule {}

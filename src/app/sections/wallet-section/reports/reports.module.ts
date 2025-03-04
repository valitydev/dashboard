import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { ExtendedModule, FlexModule, GridModule } from 'ng-flex-layout';

import { ApiModelRefsModule, IdentityFilterModule } from '@dsh/app/shared';
import { AccordionTableModule } from '@dsh/app/shared/components/accordion-table';
import { DialogModule } from '@dsh/app/shared/components/dialog';
import { ClaimFieldModule } from '@dsh/app/shared/components/inputs/claim-field';
import { IdentityFieldComponent } from '@dsh/app/shared/components/inputs/identity-field';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { BootstrapIconModule, StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';

import { CreateReportDialogComponent } from './components/create-report-dialog/create-report-dialog.component';
import { FilesComponent } from './components/files/files.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
    declarations: [ReportsComponent, CreateReportDialogComponent, FilesComponent],
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
        MatButtonModule,
        GridModule,
        ExtendedModule,
        DialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogModule,
        IdentityFieldComponent,
        BootstrapIconModule,
        MatDividerModule,
        ApiModelRefsModule,
        DetailsItemModule,
        StatusModule,
    ],
})
export class ReportsModule {}

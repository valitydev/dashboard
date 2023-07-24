import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule, ExtendedModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { IdentityFilterModule } from '@dsh/app/shared';
import { AccordionTableModule } from '@dsh/app/shared/components/accordion-table';
import { ClaimFieldModule } from '@dsh/app/shared/components/inputs/claim-field';
import { ButtonModule } from '@dsh/components/buttons';
import { DateRangeFilterModule } from '@dsh/components/date-range-filter';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
    declarations: [ReportsComponent],
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
    ],
})
export class ReportsModule {}

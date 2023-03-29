import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { TranslocoModule } from '@ngneat/transloco';

import { InlineShowAllToggleModule } from '@dsh/app/shared/components/buttons/inline-show-all-toggle';
import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';

import { InvoiceStatusFilterComponent } from './invoice-status-filter.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatRadioModule,
        InlineShowAllToggleModule,
        ExpandableRadioGroupModule,
    ],
    declarations: [InvoiceStatusFilterComponent],
    exports: [InvoiceStatusFilterComponent],
})
export class InvoiceStatusFilterModule {}

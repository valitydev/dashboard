import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

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

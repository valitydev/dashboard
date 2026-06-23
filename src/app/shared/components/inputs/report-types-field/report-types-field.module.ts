import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectFieldModule } from '@dsh/components/form-controls/multi-select-field';
import { TranslocoModule } from '@jsverse/transloco';

import { ReportTypesLabelPipe } from './pipes/report-types-label.pipe';
import { ReportTypesFieldComponent } from './report-types-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, MultiSelectFieldModule, ReactiveFormsModule],
    declarations: [ReportTypesFieldComponent, ReportTypesLabelPipe],
    exports: [ReportTypesFieldComponent, ReportTypesLabelPipe],
})
export class ReportTypesFieldModule {}

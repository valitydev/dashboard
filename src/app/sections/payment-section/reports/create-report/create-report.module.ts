import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { CreateReportDialogComponent } from './create-report-dialog.component';
import { CreateReportFormComponent } from './create-report-form';
import { FormatTimeInputDirective } from './create-report-form/format-time-input.directive';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        MatSnackBarModule,
        MatDialogModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        BaseDialogModule,
        BootstrapIconModule,
    ],
    declarations: [CreateReportDialogComponent, CreateReportFormComponent, FormatTimeInputDirective],
})
export class CreateReportModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { ReportFileComponent } from './report-file';
import { ReportFilesComponent } from './report-files.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        MatButtonModule,
        MatSnackBarModule,
        BootstrapIconModule,
    ],
    declarations: [ReportFilesComponent, ReportFileComponent],
    exports: [ReportFilesComponent],
})
export class ReportFilesModule {}

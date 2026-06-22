import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BootstrapIconModule } from '@dsh/components/indicators';
import { TranslocoModule } from '@jsverse/transloco';


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

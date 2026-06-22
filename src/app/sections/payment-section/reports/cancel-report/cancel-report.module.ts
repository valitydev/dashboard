import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmActionDialogModule } from '@dsh/components/popups';
import { TranslocoModule } from '@jsverse/transloco';

import { CancelReportService } from './cancel-report.service';

@NgModule({
    imports: [TranslocoModule, MatSnackBarModule, ConfirmActionDialogModule, MatDialogModule],
    providers: [CancelReportService],
})
export class CancelReportModule {}

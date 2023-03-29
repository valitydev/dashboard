import { NgModule } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { CancelReportService } from './cancel-report.service';

@NgModule({
    imports: [TranslocoModule, MatSnackBarModule, ConfirmActionDialogModule, MatDialogModule],
    providers: [CancelReportService],
})
export class CancelReportModule {}

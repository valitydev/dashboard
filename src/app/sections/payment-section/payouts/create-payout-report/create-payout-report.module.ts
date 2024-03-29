import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ButtonModule } from '@dsh/components/buttons';

import { CreatePayoutReportDialogComponent } from './create-payout-report-dialog.component';
import { CreatePayoutReportService } from './create-payout-report.service';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        MatSnackBarModule,
        MatDialogModule,
        FlexLayoutModule,
        ButtonModule,
        MatInputModule,
    ],
    declarations: [CreatePayoutReportDialogComponent],
    providers: [CreatePayoutReportService],
})
export class CreatePayoutReportModule {}

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Payout } from '@vality/swag-anapi-v2';

import { CreatePayoutReportDialogService } from './create-payout-report-dialog.service';

@Component({
    templateUrl: 'create-payout-report-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreatePayoutReportDialogService],
})
export class CreatePayoutReportDialogComponent implements OnInit {
    isLoading$ = this.createPayoutReportDialogService.isLoading$;
    reportCreated$ = this.createPayoutReportDialogService.reportCreated$;

    constructor(
        private dialogRef: MatDialogRef<CreatePayoutReportDialogComponent>,
        private router: Router,
        private createPayoutReportDialogService: CreatePayoutReportDialogService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: { payout: Payout }
    ) {}

    ngOnInit() {
        this.createPayoutReportDialogService.errorOccurred$.subscribe(() =>
            this.snackBar.open(
                this.transloco.translate('payouts.errors.createReportError', null, 'payment-section'),
                'OK'
            )
        );
    }

    create() {
        this.createPayoutReportDialogService.create(this.data.payout);
    }

    toReports() {
        void this.router.navigate([...this.router.url.split('/').slice(0, -1), 'reports']);
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }
}

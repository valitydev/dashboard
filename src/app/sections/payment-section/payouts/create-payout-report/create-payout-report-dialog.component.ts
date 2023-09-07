import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';
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
        private log: NotifyLogService,
        @Inject(MAT_DIALOG_DATA) private data: { payout: Payout },
    ) {}

    ngOnInit() {
        this.createPayoutReportDialogService.errorOccurred$.subscribe((err) =>
            this.log.error(
                err,
                this.transloco.selectTranslate(
                    'payouts.errors.createReportError',
                    null,
                    'payment-section',
                ),
            ),
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

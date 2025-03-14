import { Component, DestroyRef, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService, progressTo } from '@vality/matez';
import moment from 'moment/moment';
import { BehaviorSubject } from 'rxjs';

import { ReportsService } from '@dsh/app/api/wallet';
import { getDateWithTime } from '@dsh/app/sections/payment-section/reports/create-report/form-value-to-create-value';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

const TIME_PATTERN = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html',
    styles: [],
    standalone: false,
})
export class CreateReportDialogComponent {
    form = this.fb.group({
        identityID: this.data.identityID as string,
        fromDate: [moment().startOf('month').format(), Validators.required],
        fromTime: ['00:00:00', Validators.pattern(TIME_PATTERN)],
        toDate: [moment().endOf('day').format(), Validators.required],
        toTime: ['23:59:59', Validators.pattern(TIME_PATTERN)],
    });
    progress$ = new BehaviorSubject(0);

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { identityID?: string },
        private fb: NonNullableFormBuilder,
        private reportsService: ReportsService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private dr: DestroyRef,
    ) {}

    confirm(): void {
        const { identityID, fromTime, toTime, fromDate, toDate } = this.form.value;
        this.reportsService
            .createReport({
                identityID,
                reportParams: {
                    fromTime: getDateWithTime(fromDate, fromTime),
                    toTime: getDateWithTime(toDate, toTime),
                    reportType: 'withdrawalRegistry',
                },
            })
            .pipe(progressTo(this.progress$), takeUntilDestroyed(this.dr))
            .subscribe({
                next: () => {
                    this.log.success(
                        this.transloco.selectTranslate(
                            'reports.createReportDialog.success',
                            {},
                            'wallet-section',
                        ),
                    );
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                error: (err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate(
                            'reports.createReportDialog.error',
                            {},
                            'wallet-section',
                        ),
                    );
                },
            });
    }

    cancel(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}

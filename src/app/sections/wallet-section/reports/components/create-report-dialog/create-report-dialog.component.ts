import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { NotifyLogService } from '@vality/ng-core';
import moment from 'moment/moment';

import { ReportsService } from '@dsh/app/api/wallet';
import { getDateWithTime } from '@dsh/app/sections/payment-section/reports/create-report/form-value-to-create-value';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

const TIME_PATTERN = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

@UntilDestroy()
@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html',
    styles: [],
})
export class CreateReportDialogComponent {
    form = this.fb.group({
        identityID: undefined as string,
        fromDate: [moment().startOf('month').format(), Validators.required],
        fromTime: ['00:00:00', Validators.pattern(TIME_PATTERN)],
        toDate: [moment().endOf('day').format(), Validators.required],
        toTime: ['23:59:59', Validators.pattern(TIME_PATTERN)],
    });
    inProgress$;

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent>,
        private fb: NonNullableFormBuilder,
        private reportsService: ReportsService,
        private log: NotifyLogService,
        private transloco: TranslocoService
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
            .pipe(untilDestroyed(this))
            .subscribe({
                next: () => {
                    this.log.success(
                        this.transloco.translate('reports.createReportDialog.success', {}, 'wallet-section')
                    );
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                error: (err) => {
                    this.log.error(
                        err,
                        this.transloco.translate('reports.createReportDialog.error', {}, 'wallet-section')
                    );
                },
            });
    }

    cancel(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}

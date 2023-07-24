import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';

import { ReportsService } from '@dsh/app/api/wallet';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html',
    styles: [],
})
export class CreateReportDialogComponent {
    form = this.fb.group({
        identityID: undefined as string,
        fromTime: undefined as Moment,
        toTime: undefined as Moment,
    });
    inProgress$;

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent>,
        private fb: NonNullableFormBuilder,
        private reportsService: ReportsService
    ) {}

    confirm(): void {
        const { identityID, fromTime, toTime } = this.form.value;
        this.reportsService.createReport({
            identityID,
            reportParams: {
                fromTime: fromTime.utc().format(),
                toTime: toTime.utc().format(),
                reportType: 'withdrawalRegistry',
            },
        });
        this.dialogRef.close();
    }

    cancel(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}

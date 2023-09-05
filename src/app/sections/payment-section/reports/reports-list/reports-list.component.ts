import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Report } from '@vality/swag-anapi-v2';
import { switchMap } from 'rxjs';
import { first } from 'rxjs/operators';

import { CancelReportService } from '../cancel-report';

@UntilDestroy()
@Component({
    selector: 'dsh-reports-list',
    templateUrl: 'reports-list.component.html',
})
export class ReportsListComponent implements OnInit, OnDestroy {
    @Input() reports: Report[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();
    @Output() refreshData: EventEmitter<void> = new EventEmitter();

    constructor(
        private cancelReportService: CancelReportService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
    ) {}

    cancelReport(reportID: number) {
        this.cancelReportService.cancelReport(reportID);
    }

    ngOnInit() {
        this.cancelReportService.init();
        this.cancelReportService.reportCancelled$
            .pipe(
                switchMap(() =>
                    this.transloco
                        .selectTranslate(
                            'reports.cancelReport.successfullyCanceled',
                            null,
                            'payment-section',
                        )
                        .pipe(first()),
                ),
                untilDestroyed(this),
            )
            .subscribe((message) => {
                this.snackBar.open(message, 'OK', {
                    duration: 2000,
                });
                this.refreshData.emit();
            });
    }

    ngOnDestroy(): void {
        this.cancelReportService.destroy();
    }
}

import {
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import { Report } from '@vality/swag-anapi-v2';
import { switchMap } from 'rxjs';
import { first } from 'rxjs/operators';

import { CancelReportService } from '../cancel-report';

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
        private dr: DestroyRef,
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
                takeUntilDestroyed(this.dr),
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

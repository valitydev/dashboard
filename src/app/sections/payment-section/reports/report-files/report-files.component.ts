import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import { FileMeta } from '@vality/swag-anapi-v2';
import { Observable, combineLatest } from 'rxjs';

import { ReportFilesService } from './report-files.service';

@Component({
    selector: 'dsh-report-files',
    templateUrl: 'report-files.component.html',
    providers: [ReportFilesService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ReportFilesComponent implements OnInit {
    @Input() reportID: number;
    @Input() files: FileMeta[];

    isLoading$: Observable<boolean> = this.reportFilesService.isLoading$;

    constructor(
        private reportFilesService: ReportFilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private dr: DestroyRef,
    ) {}

    ngOnInit() {
        combineLatest([
            this.transloco.selectTranslate(
                'reports.errors.downloadReportError',
                null,
                'payment-section',
            ),
            this.reportFilesService.errorOccurred$,
        ])
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(([message]) =>
                this.snackBar.open(message, 'OK', {
                    duration: 2000,
                }),
            );
    }

    downloadAll() {
        this.reportFilesService.download(
            this.reportID,
            this.files.map((file) => file.id),
        );
    }
}

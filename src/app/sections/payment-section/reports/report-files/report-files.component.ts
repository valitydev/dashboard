import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { FileMeta } from '@vality/swag-anapi-v2';
import { Observable, combineLatest } from 'rxjs';

import { ReportFilesService } from './report-files.service';

@UntilDestroy()
@Component({
    selector: 'dsh-report-files',
    templateUrl: 'report-files.component.html',
    providers: [ReportFilesService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFilesComponent implements OnInit {
    @Input() reportID: number;
    @Input() files: FileMeta[];

    isLoading$: Observable<boolean> = this.reportFilesService.isLoading$;

    constructor(
        private reportFilesService: ReportFilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
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
            .pipe(untilDestroyed(this))
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

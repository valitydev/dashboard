import { Component, Input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { NotifyLogService, progressTo } from '@vality/ng-core';
import { ReportFilesInner } from '@vality/swag-wallet';
import { forkJoin, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DownloadsService } from '@dsh/app/api/wallet';
import { multipleDownload } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-files',
    templateUrl: './files.component.html',
    styles: [],
})
export class FilesComponent {
    @Input() id: number;
    @Input() files: ReportFilesInner[];

    progress$ = new BehaviorSubject(0);

    constructor(
        private downloadsService: DownloadsService,
        private transloco: TranslocoService,
        private log: NotifyLogService,
    ) {}

    download(fileIDs: string[] = this.files.map((f) => f.id)) {
        forkJoin(
            fileIDs.map((fileID) =>
                this.downloadsService.downloadFile({ fileID }).pipe(
                    catchError((err) => {
                        this.log.error(
                            err,
                            this.transloco.selectTranslate(
                                'reports.errors.downloadReportError',
                                null,
                                'wallet-section',
                            ),
                        );
                        return EMPTY;
                    }),
                    progressTo(this.progress$),
                ),
            ),
        )
            .pipe(untilDestroyed(this))
            .subscribe((files) => {
                multipleDownload(files.map((f) => f.url));
            });
    }
}

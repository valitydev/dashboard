import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FileMeta } from '@vality/swag-anapi-v2';

import { ReportFilesService } from '../report-files.service';

@Component({
    selector: 'dsh-report-file',
    templateUrl: 'report-file.component.html',
    styleUrls: ['report-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ReportFileComponent {
    @Input() reportID: number;
    @Input() file: FileMeta;

    isLoading$ = this.reportFilesService.isLoading$;

    constructor(private reportFilesService: ReportFilesService) {}

    download(fileID: string) {
        this.reportFilesService.download(this.reportID, [fileID]);
    }
}

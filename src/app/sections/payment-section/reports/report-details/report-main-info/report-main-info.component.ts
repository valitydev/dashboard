import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Report } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';

@Component({
    selector: 'dsh-report-main-info',
    templateUrl: 'report-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportMainInfoComponent {
    @Input() report: Report;

    reportStatusDict$ = this.anapiDictionaryService.reportStatus$;
    reportTypeDict$ = this.anapiDictionaryService.reportType$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}
}

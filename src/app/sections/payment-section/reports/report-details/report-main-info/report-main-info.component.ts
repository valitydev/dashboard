import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Report } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-report-main-info',
    templateUrl: 'report-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportMainInfoComponent {
    @Input() report: Report;
}

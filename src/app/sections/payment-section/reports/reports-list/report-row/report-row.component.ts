import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Report } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-report-row',
    templateUrl: 'report-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportRowComponent {
    @Input() report: Report;
}

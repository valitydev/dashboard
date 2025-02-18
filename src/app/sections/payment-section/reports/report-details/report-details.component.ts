import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-report-details',
    templateUrl: 'report-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ReportDetailsComponent {
    @Input() report: Report;
    @Output() cancelReport: EventEmitter<number> = new EventEmitter();
}

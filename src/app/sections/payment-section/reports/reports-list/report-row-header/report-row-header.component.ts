import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-report-row-header',
    templateUrl: 'report-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ReportRowHeaderComponent {}

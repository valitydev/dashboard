import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-inline-show-all-toggle',
    templateUrl: './inline-show-all-toggle.component.html',
    styleUrls: ['./inline-show-all-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class InlineShowAllToggleComponent {
    @Input() opened: boolean;
}
